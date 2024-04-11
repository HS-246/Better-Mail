function data(n) {
  //Log the subject lines and sender of your Inbox
  var threads = GmailApp.getInboxThreads(0,n);
  var subject = [];
  var sender = [];
  for (var i = 0; i < threads.length; i++) {
    subject[i] = threads[i].getFirstMessageSubject();
    sender[i] = threads[i].getMessages()[0].getFrom();
  }
  //Logger.log(subject+'\n\n\n'+sender);
  return [subject,sender,threads];
}


function makeLabels(){
  let label=[
    "Clubs",
    "Clubs/Daily Club Events",
    "Clubs/VIT Events",
    "Clubs/Sports",
    "Clubs/Misc. Club Events",
    "Urgent",
    "Urgent/HOD",
    "Urgent/Dean Academics",
    "General",
    "General/Guest Lectures",
    "General/VITTBI",
    "General/Transfer Programs",
    "General/Post-Grad Exam",
    "General/Internship",
    "General/Extracurricular",
    "Living",
    "Living/Hostel",
    "Living/Library",
    "Miscellaneous"
  ];// list of all labels and sub labels

  label.forEach(function(name){
    // checks if label exists, and if doesnt, makes one.
    var label = GmailApp.getUserLabelByName(name);
    if (label) return label;

    if (name.includes("General")||name.includes("Living")||name.includes("Miscellaneous"))
    var textColor = "#000000";
    else
    var textColor = "#ffffff";
    var backgroundColor = "#000000";

    /*switch (name){
    case"Clubs": backgroundColor = "#429ea6"; break;
    case"Clubs/Daily Club Events" : backgroundColor = "#114b5f";break;
    case"Clubs/VIT Events" : backgroundColor = "#1b2f53";break;
    case"Clubs/Sports": backgroundColor = "#093742";break;
    case"Clubs/Misc. Club Events": backgroundColor = "#0a5475";break;
    case"Importan": backgroundColor = "#ff1400";break;
    case"Importan/HOD": backgroundColor = "#751308";break;
    case"Importan/Dean Academics": backgroundColor = "#4f1111";break;
    case"General": backgroundColor = "#feaa26";break;
    case"General/Guest Lectures": backgroundColor = "#d17000";break;
    case"General/VITTBI": backgroundColor = "#c45113";break;
    case"General/Transfer Programs": backgroundColor = "#953f07";break;
    case"General/Post-Grad Exam": backgroundColor = "#763809";break;
    case"General/Internship": backgroundColor = "#ba5f17";break;
    case"General/Extracurricular": backgroundColor = "#000000";break;
    case"Living": backgroundColor = "#33b619";break;
    case"Living/Hostel": backgroundColor = "#3b6a05";break;
    case"Living/Library": backgroundColor = "#245306";break;
    case"Miscellaneous": backgroundColor = "#eed3a5";break;
    }*/

    switch (name){// color list.. duh
    case"Clubs": backgroundColor = "#4a86e8"; break;
    case"Clubs/Daily Club Events" : backgroundColor = "#4a86e8";break;
    case"Clubs/VIT Events" : backgroundColor = "#4a86e8";break;
    case"Clubs/Sports": backgroundColor = "#4a86e8";break;
    case"Clubs/Misc. Club Events": backgroundColor = "#4a86e8";break;
    case"Urgent": backgroundColor = "#e66550";break;
    case"Urgent/HOD": backgroundColor = "#e66550";break;
    case"Urgent/Dean Academics": backgroundColor = "#e66550";break;
    case"General": backgroundColor = "#fad165";break;
    case"General/Guest Lectures": backgroundColor = "#fad165";break;
    case"General/VITTBI": backgroundColor = "#fad165";break;
    case"General/Transfer Programs": backgroundColor = "#fad165";break;
    case"General/Post-Grad Exam": backgroundColor = "#fad165";break;
    case"General/Internship": backgroundColor = "#fad165";break;
    case"General/Extracurricular": backgroundColor = "#fad165";break;
    case"Living": backgroundColor = "#43d692";break;
    case"Living/Hostel": backgroundColor = "#43d692";break;
    case"Living/Library": backgroundColor = "#43d692";break;
    case"Miscellaneous": backgroundColor = "#999999";break;
    }

    // makes labels using gmail api
    var userId = "me";
    var resource = Gmail.newLabel();
    resource.labelListVisibility = "labelShow";
    resource.messageListVisibility = "show";
    resource.name = name;
    var labelColor = Gmail.newLabelColor();
    labelColor.textColor = textColor;
    labelColor.backgroundColor = backgroundColor;
    resource.color = labelColor;
    Gmail.Users.Labels.create(resource, userId);
    return GmailApp.getUserLabelByName(name);
  });
}


function deleteAll(){
  // deletes all lists we made, only for testing purposes
  let labels=[
    "Clubs",
    "Clubs/Daily Club Events",
    "Clubs/VIT Events",
    "Clubs/Sports",
    "Clubs/Misc. Club Events",
    "Urgent",
    "Urgent/HOD",
    "Urgent/Dean Academics",
    "General",
    "General/Guest Lectures",
    "General/VITTBI",
    "General/Transfer Programs",
    "General/Post-Grad Exam",
    "General/Internship",
    "General/Extracurricular",
    "Living",
    "Living/Hostel",
    "Living/Library",
    "Miscellaneous"
  ];
  labels.forEach(function(labe){
    l=GmailApp.getUserLabelByName(labe);
    if (l!= null)
    l.deleteLabel();
  });
}


function checker(sender,subject){
  //checks all needed conditions and gives labels accordingly
  labels = [];
  if (sender.includes('Director Student Welfare')){
    labels.push("Clubs");
    if (subject.startsWith("1")||subject.startsWith("2")||subject.startsWith("3")||subject.startsWith("4")||subject.startsWith("5")||subject.startsWith("6")||subject.startsWith("7")||subject.startsWith("8")||subject.startsWith("9"))
    labels.push("Clubs/Daily club events");
    else if (sender.includes("\'Convenor Riviera\'") || sender.includes("\'Convenor Gravitas\'"))
    labels.push("Clubs/VIT Events")
    else
    labels.push("Clubs/Misc. Club Events")
  }
  else if (sender.includes("Director Physical Education")){
    labels.push("Clubs");
    labels.push("Clubs/Sports");
  }
  else if (sender.includes("HOD")){
    labels.push("Urgent");
    labels.push("Urgent/HOD");
  }
  else if (sender.includes("Dean Academics")){
    labels.push("Urgent");
    labels.push("Urgent/Dean Academics")
  }
  else if (subject.includes("lecture")||subject.includes("Lecture")||subject.includes("lectures")||subject.includes("Lectures")){
    labels.push("General");
    labels.push("General/Guest Lectures");
  }
  else if (sender.includes("VITTBI Vellore")){
    labels.push("General");
    labels.push("General/VITTBI");
  }
  else if (sender.includes("Dr.C.Vijay Kumar, Director (IR)")){
    labels.push("General");
    labels.push("General/Transfer Programs");
  }
  else if (sender.includes("VIT Placement")){
    labels.push("General");
    if ((subject.includes("CAT")||subject.includes("GRE")||subject.includes("IELTS")))
    labels.push("General/Post-Grad Exam");
    else
    labels.push("General/Internship");
  }
  else if (sender.includes("Dean")){
    labels.push("General");
    labels.push("General/Extracurricular")
  }
  else if (sender.includes("Director Periyar EVR Central Library")){
    labels.push("Living");
    labels.push("Living/Library");
  }
  else if (sender.includes("Chief Warden, Mens Hostel")||sender.includes("Chief Warden, Womens Hostel")){
    labels.push("Living");
    labels.push("Living/Hostel");
  }
  else
  labels.push("Miscellaneous");

  return labels;
}


function repeater(subject,sender,threads,e){

  Logger.log("sorting mail...")
  //if (e=='HDmj0nf3QSCjqjCLEl8AjQ')//added post hackathon
  var [subject,sender,threads] = data(10);//added post hackathon
  Logger.log(sender);//added post hackathon


  for (var i=0; i < subject.length; i++){
    //checks the parameters to check label eligibility
    var finalLabels=checker(sender[i],subject[i]);
    finalLabels.forEach(function(label){
      //adds the labels to the thread
      var lab ="";
      lab=GmailApp.getUserLabelByName(label);
      lab.addToThread(threads[i]);
      });
  }

  threads = GmailApp.getInboxThreads(0,20);
  GmailApp.refreshThreads(threads);
  Logger.log("almost done..")
}

function reset(){
  deleteAll();
  makeLabels();
}


function main(){
var [subject,sender,threads] = data(50);
makeLabels()
var check=false;

/*for (var i=0; i < subject.length; i++){
  //checks the parameters to check label eligibility
  var finalLabels=checker(sender[i],subject[i]);
  finalLabels.forEach(function(label){
    //adds the labels to the thread
    var lab ="";
    lab=GmailApp.getUserLabelByName(label);
    lab.addToThread(threads[i]);

    });
  }*/

ScriptApp.newTrigger('repeater')
      .timeBased()
      .everyMinutes(10)
      .create();
      //makes a timer hoprefully?

repeater(subject,sender,threads)

}



