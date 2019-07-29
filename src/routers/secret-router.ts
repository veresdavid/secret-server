import express from "express";
import crypto from "crypto";
import Secret, { ISecret } from "./../models/Secret";
import responseConverter from "./../response-converter";

// router for handling secret related operations
const secretRouter = express.Router();

// a small function that helps to remove MongoDB related fields from the result object (like _id and __v)
function removeMongoFields(secret: ISecret) {

    const newObject = {
        hash: secret.hash,
        secretText: secret.secretText,
        createdAt: secret.createdAt,
        expiresAt: secret.expiresAt,
        remainingViews: secret.remainingViews
    };

    return newObject;

}

// endpoint for saving a new secret
secretRouter.post("/", (req, res) => {

    // TODO: validate request body parameters here

    // construct object that we want to save
    const objectToSave = {
        secretText: req.body.secret,
        createdAt: new Date(),
        expiresAt: req.body.expireAfter,
        remainingViews: req.body.expireAfterViews
    };

    // create SHA256 hash for the created object
    const hash = crypto.createHash("sha256").update(JSON.stringify(objectToSave)).digest("hex");
    
    // save the secret to the db
    Secret.create({
        hash: hash,
        ...objectToSave
    }).then((secret: ISecret) => {

        // send the secret object to the corresponding response converter
        responseConverter.formatResponse(req, res, removeMongoFields(secret));

    }).catch(err => {
        
        // if we couldn't save the secret, send back some error object
        responseConverter.formatResponse(req, res, {
            error: "There was an error! We couldn't save the secret :("
        });

    });
    
});

// endpoint for receiving an existing secret
secretRouter.get("/:hash", (req, res) => {
    
    // get the given hash from the url path
    const hash = req.params.hash;

    // find the secret with the given hash
    Secret.findOne({
        hash: hash
    }, (err, secret: ISecret) => {
        
        // if there was an error, send back some error object
        if(err) {
            
            responseConverter.formatResponse(req, res, {
                error: "There was an error while we were trying to find your secret :("
            });

        } else {

            // if theres no secret with the given hash, return an error object
            if(secret === null) {
                
                responseConverter.formatResponse(req, res, {
                    error: "Theres no such secret with the given hash!"
                });

            }
            // if theres no more remaining views on the secret, return some error object
            else if(secret.remainingViews === 0) {
                
                responseConverter.formatResponse(req, res, {
                    error: "This secret will remain a secret..."
                });

            }
            // if the secret is expired, return some error object
            else if(secret.expiresAt < new Date()) {
                
                responseConverter.formatResponse(req, res, {
                    error: "This secret will remain a secret..."
                });

            } else {

                // decrease the secret's remaining number of views counter
                const newRemainingViews = secret.remainingViews - 1;

                // update the object
                secret.remainingViews = newRemainingViews;

                // save the object in the database
                secret.save((err, newSecret) => {

                    if(err) {
                        
                        responseConverter.formatResponse(req, res, {
                            error: "There was an error while we were trying to retrieve your secret :("
                        });

                    } else {

                        // send the saved object to the user
                        responseConverter.formatResponse(req, res, removeMongoFields(newSecret));

                    }

                });

            }

        }

    });

});

export default secretRouter;