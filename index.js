function submitData(event) {
  event.preventDefault();

  let data = new FormData(document.getElementById("formfinal"));

  let pdata = Object.create({})
  for (let [k, v] of data.entries()) {
    pdata[k] = v;
  }
  console.log(pdata)

  let dob = new Date(pdata.dob);
  let month_diff = Date.now() - dob.getTime();
  let age_dt = new Date(month_diff);
  let year = age_dt.getUTCFullYear();
  let age = year - 1970;

  if (age < 18) {
    window.alert(`Please add a contact for the Patient as ${pdata.Sex == "Male" ? "he" : "she"}, is a minor.`)

  }
  console.log([age])
}

document.getElementById("formfinal").reset();



var leftshowcontent = document.getElementById("sideshow");
var sidebarCollapse = document.getElementById("sidebar-collapse");
var expand = document.getElementById("maindiv");
function sidebarShow(){
  // console.log(leftshowcontent);
  leftshowcontent.classList.toggle("hide-sidebar");
  expand.classList.toggle("expand-main");
}

var othershowcontent = document.getElementById("other-in");
var otherCollapse = document.getElementById("othersection");
function otherInfoShow(){
  // console.log(othershowcontent);
  othershowcontent.classList.toggle("hide-otherinfo");
}
// "1. Collapsible SIdebar: Good
// 2. Respoinsive: Good
// 3. Scroll Handled and custom scroll style as per layout
// 4. Patient photo not rounded square
// 5. Missing Cursor pointer on buttons
// 6. Added JS functionalityto add contact in Contact Detail section : Good
// 7. Added validations for the form
// 8. Scroll handled in Contact Details Section: Good
// 9. Used CSS Variables: Good

// 11. Inconsistent naming of classes
// 12. functionlity for age as per requirement however need to simplify; Score would have been 4 in JS if this was not missed
// 13. Created functions for reusability"
// "1. Good Detailing. Scroll managed correctly
// 2. Use of pseudo element for required indicator:good
// 3. Responsive: Good
// 4. Should avoid doing layout using HTML Tables"
// "1.Form's label control alignment is not as per layout.
// 2. Added Collapsible sidebar using JS: GGood
// 3. Cursor pointer and hover styles added Good
// 4. Scroll managed, outer scroll for main Form section
// 5. Version comment in HTML: Good
// 6. Complete page could have been managed using single form, why created multiple forms in html ?
// 7, function naming consistent"
// "1. Scroll managerd correctly. Add custom styling for scroll. Good. 
// 2. Use class for styling on elements instead of id
// 3. Why is Fee Schedule select not working
// 4. Age besided DOB added static. Either not checked the complete functiionalty. If not implemented, should not haved added hardcoded
// 5. Added validation on firstname , good
// 6. Cursor pointer on buttons missing
// 7. Required indicator on forms controls missing
// 8. Alignment of Delete button in Contact details is not corect
// 9. Contact prefence table not implemented as per layout
// 10. Form Column layout responsive due to flex display. But need to take care of smaller resolution by making the columns full width
// 11. Code formatted : good"
// "1. Why added different background color to sidebar and tab menu background?
// 2. Should have taken more care for spacing of icons. IN general : spacing and 
// 3. Not able to scroll in the sidebar
// 4. Added validtions: good
// 5. Need to align delete buttons
// 6. + button different in contact details section from the layout shared
// 7. Missed the functionlity of console log of filled data
// 8. Naming of the classes is consistent and with prefix: good"
// "1. Why so much empty space at the top
// 2. Missing required indicators
// 3. Collapsible sidebars: Good
// 4. Responsive styling: Good; but why is it that first two columns are not collapsed and third column is collapsed ?
// 5. Incorrect functionality added for Age: Are you familiar with Patient contact in patient chart (from the product training) ?
// 6. Option1, Option 2 in all select buttons
// 7. Cursor pointer on button
// 8,. Custom Scrollbar
// 9. When clicked on Contact prefence control, table size increases. Can this be fixed ?
// 10. Why using rounded cells in contact preference table, is it part of the layout shared ?
// 11. Use - casing instead of snake casing for classes
// 12. Inconsistent naming of function why shortcut for submit(subt) used in functaion name ?"
// "1. On clicking of the button, the layout shifts,
// 2. Asterisk for required fields added; Good
// 3. Collapsible sidebar: good
// 4. Sidebar Backround color and form background color not same as the one provide din layout
// 5. Passing Argument in function for calculating age: Good
// 6. Do not use table for layout"
// "0. Relative links to resources (css, js) not working, image used in the page not submitted with submission 
// 1. Scroll managerd correctly. Add custom styling for scroll.
// 2. Fields not aligned and width not set properly
// 3. Hover styling on link good, Labels are not properly cased. Need to emulate the layout as closely as provided.
// 4. Age besided DOB added static. Either not checked the complete functiionalty. If not implemented, should not haved added hardcoded
// 5 Controls leaking out of container in lower resolution. Layout breaking.
// 6. Cursor pointer on buttons missing
// 7. Delete buttons are aligned correctly : Good
// 8. Need to resubmit with Form Styling Done
// 9. Separator added. Good
// 10, Button colors not provided
// 11. All styling done using classes: Good
// 12. Added column styling with 33% width : Good
// 13. More than required inline styles"
// "1. Layout alignment breaks in higher resolution
// 2. Image aspect ratio not proper. image was square in the layout given
// 3. Why are the text inputs made deliberately smaller. Do they look good ?
// 4. Sections made in Menu: good
// 5. Hover effect on button + cursor:pointer on button: Good
// 6. Hover effect on menu links  good
// 7. FormData, entries, Object.FromEntries
// 8. Calculated Age dynamically and set in HTML Page : Good"
// "1. Scroll managed. 
// 2. Contact Detail Blocks handling smaller screen, but need to do the same implementation in Demographics form on top
// 3. Cursor pointer missing on buttons
// 4. Required indicator missing. 
// 5. Border on Contact Details screen not looking good
// 6. hover styling on menu link missing
// 7. Emulated Contact Prefernce layout closely
// 8. Use - instead of camelCasing in classes
// 9. Added PD prefix for all classes. Good- what is the reason ?"
// "1. Good naming of classes (eg: nav, nav-item)
// 2. Missed functionality of Showing alert for minor
// 3. Why is so much margin added on top?
// 4. Options in select buttons not added properly. Option1, option 2 added for all selections
// 5. Layout not completed
// 6.  ""ReVerify"" Spelling mistake, Spelling mistake in other places as well 
// 7. Patient photo is not square as per layout
// 8. No functions in Javascript"
// "1. Why is the styling not done to look like the layout provided ? What is the main reason ?
// 2. Patient photo is round instead of rounded square
// 3. Need to submit again with styling
// "
// "1. Vertical and Horizontal 
// Scroll on the whole page, but left menu is fixed. is this layout logically correct ?
// 2. Only the first level form logged in console in Javascript
// 3. Cursor pointer on buton. Good
// 4. Alignment with respect to 
// 5. All Links in left menu not added
// 6. Border radius an shadow not implemented
// 7. Layout created using tr, tbody. Need to implement the same using div
// 8. Check the message of the DOB. Copies as was given. Didn't try to understand the functaionality required. Message shown is ""Please add a contact for the Patient as he / she (depending on the gender), is a minor""
// 9. What was the need to deduct 1970 from the getFullUTCYear ?
// 10. CSS Naming form1, form2, form3, dispay4. Should use proper names as per their use
// 11. Syntax error in CSS
// 12. Avoid styling using IDs . instead use classes only
// 13. Styling not close enough to the reference provided
// 14: agecalculator() could have taken dob as parameter and returned value
// 15. Same styling rules applied using multiple classes like .display4-form3
// 16. Should've used aside tag"
// "1 Scroll layoutnot hanled correctly. Need to resubmit again
// 2. Do not use id for styling
// 3. Need to resubmit again with styling and complete JS functionality
// 4. Not complete form data is logged"

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


  // // function otherInOut() {
  // //   let patientOtherDetailView = document.getElementsByClassName("other-in")[0];
  // //   let patientOtherDetailShowElement = document.getElementById("other-out");
  
  // //   if (patientOtherDetailShowElement.classList.contains("fa-solid fa-circle-plus")) {
  // //       patientOtherDetailShowElement.classList.remove("fa-solid fa-circle-plus");
  // //       patientOtherDetailShowElement.classList.add("fa-circle-chevron-down");
  // //       patientOtherDetailView.style.display = "flex";
  // //   } else {
  // //       patientOtherDetailShowElement.classList.remove("fa-circle-chevron-down");
  // //       patientOtherDetailShowElement.classList.add("fa-solid fa-circle-plus");
  // //       patientOtherDetailView.style.display = "none";
  // //   }
  // // }
  
  