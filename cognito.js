const AmazonCognitoId = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const CognitoExpress = require('cognito-express')
//global.fetch = require("node-fetch");

const poolData = { 
    UserPoolId : 'ap-south-1_pf9qPxy7y',
    ClientId : '2k6og52lpml6o83rp4msl0tjkl'
};
const aws_region ="ap-south-1";
const cognitoUserPool = AmazonCognitoId.cognitoUserPool;
const userPool = new AmazonCognitoId.CognitoUserPool(poolData);
const signUp = (name,email,password)=>{
    return  new Promise((result,reject)=>{
        try{
            console.log("inside cognito password="+password);
            console.log("inside cognito name"+name);
            console.log("inside cognito email="+email);
            
            const attributeList = [];
            attributeList.push( new AmazonCognitoId.CognitoUserAttribute({Name:"name", Value :"Rameshk"}));
            attributeList.push( new AmazonCognitoId.CognitoUserAttribute({Name:"email", Value :email}));
            attributeList.push( new AmazonCognitoId.CognitoUserAttribute({Name:"phone_number", Value :"+919986060833"}));
            console.log("inside attributeList"+attributeList);
            userPool.signUp(email,password,attributeList,null,(err,data)=>{
                console.log("Error="+err);
                console.log("data="+data);
                if(err) reject(err);
                else result(data);
            });
        } catch(err){
            console.log("Error in cognito"+err);
            reject(err);
        }
    });
};

const verifyCode= (username,code)=>{
    return new Promise((resolve,reject)=>{
        const userPool = new AmazonCognitoId.CognitoUserPool(poolData)
        const userData= {
            Username:username,
            Pool:userPool
        };
        const cognitoUser = new AmazonCognitoId.CognitoUser(userData);
        cognitoUser.confirmRegistration(code,true,(error,rejult)=>{
            if(error){
                reject(error);
            } else{
                resolve(rejult);
            }
        });
    });
};

const changePwd= (username,password,newpassword)=>{
    return new Promise((resolve,reject)=>{
        const authenticateDetail = new AmazonCognitoId.AuthenticationDetails({
            Username:username,
            Password:password
        });
        const userData= {
            Username:username,
            Pool:userPool
        };
        const cognitoUser = new AmazonCognitoId.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticateDetail,{
            onSuccess: result=>{
                cognitoUser.changePassword(password,newpassword,(error,rejult)=>{
            if(error){
                reject(error);
            } else{
                resolve(rejult);
            }
        });
    },
      onFailure: err=>{
        reject(err);
      }

    });
});
};


const login= (name,password)=>{
    return new Promise((resolve,reject)=>{
        const authenticateDetail = new AmazonCognitoId.AuthenticationDetails({
            Username:name,
            Password:password
        });
        const userData= {
            Username:name,
            Pool:userPool
        };
        const cognitoUser = new AmazonCognitoId.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticateDetail,{
            onSuccess: result=>{
                console.log("USER Group==="+result.getAccessToken().payload["cognito:groups"]);
                resolve({
                    accessToken: result.getAccessToken().getJwtToken(),
                    idToken: result.getIdToken().getJwtToken(),
                    refreshToken : result.getRefreshToken().getToken()
                });
               
            
    },
      onFailure: err=>{
        reject(err);
      }

    });
});
};


module.exports.verifyCode = verifyCode;
module.exports.signUp = signUp;
module.exports.changePwd = changePwd;
module.exports.login = login;