import { saveUpdateTeam,getTeamDetail } from '../../../../../firebase/onboarding-db';
export async function sendMail(element,teamName,tokenz){
  const recieverarr = [];
  const reciever = element;//$(element).val().trim();
  //let tokenz;
  if (reciever !== '' && reciever !== undefined) {
    recieverarr.push(reciever);

    // Generate a 16 character alpha-numeric token:
    console.log(`token- ${tokenz}`);
    const appUrl = window.location.href;
    const redireURL = `${appUrl}?teamname=${teamName}&token=${tokenz}`;// &useremail=${reciever}`;
    const output = `<div style="border: 6px solid #ccc;font-family:arial;width: 800px;margin: auto;">
          <div style="text-align:center;padding-top: 50px;"><img src="https://media.licdn.com/dms/image/C560BAQEYp_bjM8rH9w/company-logo_200_200/0?e=2159024400&v=beta&t=YN-rmUmfLXgy7WrKeZ-aDfePrC6cM3GNTQg_wybCpnk" alt="sapient-logo"/></div>
          <div style="padding-bottom: 120px;padding-left: 50px;padding-right: 50px;padding-top: 30px;"><h1 style="color: #bd1414;">Welcome to Sapient-Slack!</h1>
          <p>You’re added to new Sapient-Slack workspace <strong style="color:#0d73f1;font-size: 20px;">${teamName}</strong>. Want to join the workspace??</p>
          <div><a style="border-top:13px solid; border-bottom:13px solid; border-right:24px solid; border-left:24px solid; border-color:#2ea664; border-radius:4px; background-color:#2ea664; color:#ffffff; font-size:18px; line-height:18px; word-break:break-word; display:inline-block; text-align:center; font-weight:900; text-decoration:none!important" href="${redireURL}">Yes Join!</a></div></div></div>`;

    // let team = await getTeamDetail(teamName);
    //
    //
    // let updatedTeam;
    // if(team != 'undefined' && team != null && team != "") {
    //   if(team.invitations != 'undefined' && team.invitations != null && team.invitations != "") {
    //       updatedTeam=team;
    //       console.log('before add-'+JSON.stringify(updatedTeam.invitations));
    //       updatedTeam.invitations[tokenz] = reciever;
    //       if ('temp' in updatedTeam.invitations) {
    //         delete updatedTeam.invitations['temp'];
    //       }
    //       console.log('after add-'+JSON.stringify(updatedTeam.invitations));
    //   }
    // }
    if (typeof recieverarr !== 'undefined' && recieverarr.length > 0) {
      // console.log(recieverarr);
      // let teamSaveResult = await saveUpdateTeam(teamName, updatedTeam);
        //console.log(team) //will log results.
        Email.send('slackmailing@gmail.com',
          reciever,
          'Invitation to join slack',
          output,
          'smtp.gmail.com',
          'slackmailing@gmail.com',
          'Slack@246');
    }
  }
};
export async function updateTeam(elements,teamName,tokens){

      let team = await getTeamDetail(teamName);

      let updatedTeam;
      if(team != 'undefined' && team != null && team != "") {
        if(team.invitations != 'undefined' && team.invitations != null && team.invitations != "") {
            updatedTeam=team;
            console.log('before add-'+JSON.stringify(updatedTeam.invitations));
            //updatedTeam.invitations[tokenz] = reciever;
            for(let i=0;i<elements.length;i++){
              let token=tokens[i];
              updatedTeam.invitations[token]=elements[i];
            }
            if ('temp' in updatedTeam.invitations) {
              delete updatedTeam.invitations['temp'];
            }
            console.log('after add-'+JSON.stringify(updatedTeam.invitations));
            let teamSaveResult = await saveUpdateTeam(teamName, updatedTeam);
        }
      }
      // if (typeof recieverarr !== 'undefined' && recieverarr.length > 0) {
      //   console.log(recieverarr);
      //   let teamSaveResult = await saveUpdateTeam(teamName, updatedTeam);
      // }
}
