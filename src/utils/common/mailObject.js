import { APP_LINK, MAIL_ID } from "../../config/serverConfig.js";

export const workspaceJoinMail = function(workspace){
    return{
        from: MAIL_ID,
        subject: "You have been added to a workspace",
        text: `Congratulations! You have been added to ${workspace.name} workspace`,
    }
}

export const verifyEmailMail = function (verificationToken) {
    //console.log("verificationToken", verificationToken);
  return {
    from: MAIL_ID,
    subject: 'Welcome to the app. Please verify your email',
    text: `
      Welcome to the app. Please verify your email by clicking on the link below:
     ${APP_LINK}/verify/${verificationToken}
    `
  };
};