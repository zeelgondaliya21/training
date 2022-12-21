document.getElementById("formfinal").reset();


function submitData(event) {
  event.preventDefault();

  let data = new FormData(document.getElementById("formfinal"));

  let pdata = Object.create({})
  for (let [k, v] of data.entries()) {
    pdata[k] = v;
  }
  let dob = new Date(pdata.dob);
  let month_diff = Date.now() - dob.getTime();
  let age_dt = new Date(month_diff);
  let year = age_dt.getUTCFullYear();
  let age = year - 1970;
  
  if (age < 18) {
      window.alert(`Please add a contact for the Patient as ${pdata.Sex == "Male" ? "he" : "she"}, is a minor.`)
  
  }
  console.log(pdata)
}

// function patientOtherDetailShowFun() {
//   let patientOtherDetailView = document.getElementsByClassName("PDCCODbottom")[0];
//   let patientOtherDetailShowElement = document.getElementById("patientOtherDetailShow");

//   if (patientOtherDetailShowElement.classList.contains("fa-circle-chevron-right")) {
//       patientOtherDetailShowElement.classList.remove("fa-circle-chevron-right");
//       patientOtherDetailShowElement.classList.add("fa-circle-chevron-down");
//       patientOtherDetailView.style.display = "flex";
//   } else {
//       patientOtherDetailShowElement.classList.remove("fa-circle-chevron-down");
//       patientOtherDetailShowElement.classList.add("fa-circle-chevron-right");
//       patientOtherDetailView.style.display = "none";
//   }
// }

// function patientLeftbarShowFun(){
//   let PDCLeftbarShowElement = document.getElementById("PDCLeftbarShow");
//   let PDCLeftbarView = document.getElementById("PDCLeftbar");
//   let PDCLeftListIteamsView = document.getElementsByClassName("PDCLeftList")[0];

//   if (PDCLeftbarShowElement.classList.contains("fa-chevron-left")) {
//       PDCLeftbarShowElement.classList.remove("fa-chevron-left");
//       PDCLeftbarShowElement.classList.add("fa-chevron-right");
//       PDCLeftbarView.style.width = "17px";
//       PDCLeftbarView.style.padding = "5px 0px 10px 0px";
//       PDCLeftListIteamsView.style.color = "#e0e0e0";
//   } else {
//       PDCLeftbarShowElement.classList.remove("fa-chevron-right");
//       PDCLeftbarShowElement.classList.add("fa-chevron-left");
//       PDCLeftbarView.style.width = "220px";
//       PDCLeftbarView.style.padding = "5px 15px 10px 17px";
//       PDCLeftListIteamsView.style.color = "inherit";
//   }

// }

// function submitPatientData(event) {
//   event.preventDefault();

//   let data = new FormData(document.getElementById("inputPatientData"));
//   // console.log(data)

//   let patientData = Object.create({})
//   for (let [k, v] of data.entries()) {
//       patientData[k] = v;
//       // console.log(k," : ", v); 
//   }

//   console.log(patientData)

//   const dob = new Date(patientData.dob);
//   let month_diff = Date.now() - dob.getTime();
//   let age_dt = new Date(month_diff);
//   let year = age_dt.getUTCFullYear();
//   let age = year - 1970;

//   if (age < 0) {
//       window.alert(`DOB can not be greater than today's date!`)
//   }
//   else if (age < 18) {
//       window.alert(`Please add a contact for the Patient as ${patientData.gender == "Male" ? "he" : "she"}, is a minor.`)
//   }

  // console.log(age)
//}