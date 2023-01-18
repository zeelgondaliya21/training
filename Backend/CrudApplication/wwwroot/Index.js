//dateOfBirth
//var date = new Date();
//var year = date.getFullYear();
//var month = date.gentMonth() + 1;
//var today = String(date.getDate()).padStart(2, '0');
//var datePattern = month + '/' + today + '/' + year;
//document.getElementById('"dateofbirth').value = datePattern;

//GetByID
let chartnumberValue = document.getElementById("chartid");
let firstnameValue = document.getElementById("fname");
let middlenameValue = document.getElementById("mname");
let lastnameValue = document.getElementById("lname");
let genderValue = document.getElementById("sex");
let dobValue = document.getElementById("dateofbirth");
let homeurl = `https://localhost:7162/api/Patient`;
let pid = document.location.href.split('?')[1];
let queryString = new URLSearchParams(pid);
let id;
for (let pair of queryString.entries()) {
    console.log("Key is: " + pair[0]);
    console.log("Value is: " + pair[1]);
    id = pair[1];
}
const url = `https://localhost:7162/api/Patient/${pid}`;
console.log(url);
if (id != "") {
    const res = fetch(`https://localhost:7162/api/Patient/${id}`);


    const data = res.then(async (r) => {
        console.log(r);
        return r.json();
    }).then((d) => {
        console.log(d);
        const t = d[0];
        chartnumberValue.innerHTML = t.chart_number;
        firstnameValue.value = t.firstname;
        lastnameValue.value = t.lastname;
        middlenameValue.value = t.middlename;
        genderValue.value = t.sex;
        dobValue.value = new Date(t.dob);
        console.log(typeof (t.dob));
    })

}

function submitData(event) {
    event.preventDefault();
    //object of formdata
    let data = new FormData(document.getElementById("formfinal"));

    let pdata = Object.create({})
    for (let [k, v] of data.entries()) {
        pdata[k] = v;
    }
    //post data if id isn't found in url
    if (!id) {
        
        let postPatientData = {
            "firstname": document.getElementById("fname").value,
            "middlename": document.getElementById("mname").value,
            "lastname": document.getElementById("lname").value,
            "sex": document.getElementById("sex").value,
            "dob": document.getElementById("dateofbirth").value
        };
        console.log(postPatientData);
        fetch('https://localhost:7162/api/Patient', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postPatientData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
    //put data if id found in url
    if (id) {
        console.log(id);
        let puturl = `https://localhost:7162/api/Patient/${id}`;
        let putPatientData = {
            "firstname": document.getElementById("fname").value,
            "middlename": document.getElementById("mname").value,
            "lastname": document.getElementById("lname").value,
            "sex": document.getElementById("sex").value,
            "dob": document.getElementById("dateofbirth").value
        }
        fetch(`https://localhost:7162/api/Patient/${id}`, {
            method: "PUT",
            body: JSON.stringify(putPatientData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
    //calculate age from date of birth
    let dob = new Date(pdata.dob);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = year - 1970;

    if (age < 18) {
        window.alert(`Please add a contact for the Patient as ${pdata.Sex == "Male" ? "he" : "she"}, is a minor.`)

    }
}
//reset form data
document.getElementById("formfinal").reset();



var leftshowcontent = document.getElementById("sideshow");
var sidebarCollapse = document.getElementById("sidebar-collapse");
var expand = document.getElementById("maindiv");

//sidebar hide and show
function sidebarShow() {
    // console.log(leftshowcontent);
    leftshowcontent.classList.toggle("hide-sidebar");
    expand.classList.toggle("expand-main");
    if (leftshowcontent.classList.contains("fa fa-chevron-left")) {
        leftshowcontent.classList.remove("fa fa-chevron-left");
        leftshowcontent.classList.add("fa fa-chevron-right")
    }
    else {
        leftshowcontent.classList.remove("fa fa-chevron-right");
        leftshowcontent.classList.add("fa fa-chevron-left");
    }
}

//other info hide and show
var othershowcontent = document.getElementById("other-in");
var otherCollapse = document.getElementById("othersection");
function otherInfoShow() {
    // console.log(othershowcontent);
    othershowcontent.classList.toggle("hide-otherinfo");
    if (leftshowcontent.classList.contains("fa-solid fa-circle-chevron-down")) {
       leftshowcontent.classList.remove("fa-solid fa-circle-chevron-down");
        leftshowcontent.classList.add("fa-solid fa-circle-chevron-up")
    }
    else {
        leftshowcontent.classList.remove("fa-solid fa-circle-chevron-up");
        leftshowcontent.classList.add("fa-solid fa-circle-chevron-down");
    }
}

//adding and deleting address panel
var addbtn = document.getElementById("sec12");
function addSection() {
    document.querySelector('#sec12').insertAdjacentHTML(
        'afterbegin',
        `<div id="form1">
    <fieldset>
        <legend>
            <select name="home" id="add1">
                <option>Home</option>
                <option>Work</option>
                <option>Other</option>
            </select>
            <span style="padding-bottom: 20px;">Adress<i class="fa-solid fa-trash-can" onclick="removeSection()" id="trashbin"></i></span>
            
        </legend>
        <label style="font-size: 20px;">Street</label><br><input type="text"
            name="street1" id="">
        <table style="width: 100%;">
            <tr>
                <td><label>Zip</label><br><input type="text" name="zip1" id=""></td>
                <td><label>City</label><br><input type="text" name="city1" id="">
                </td>
                <td><label>State</label><br><select name="state1" id="state1">
                        <option>California</option>
                        <option>Pensilvenia</option>
                        <option>Florida</option>
                    </select>
                <td><label>Coutnry</label><br><select name="country1" id="coutnry1">
                        <option>India</option>
                        <option>US</option>
                        <option>Canada</option>
                    </select></td>
            </tr>
        <table style="width: 100%;">
        <h6>Phone<i class="fa-solid fa-circle-plus"></i></h6>
        <table>
            <tr>
                <td colspan="2"><label>Type</label>
                    <hr><select name="type1" id="type">
                        <option>Call</option>
                        <option>Landline</option>
                    </select>
                </td>
                <td colspan="2"><label>Code</label>
                    <hr><select name="code1" id="code1">
                        <option>+1(US)</option>
                        <option>+91(Ind)</option>
                        <option>+7(Rus)</option>
                    </select>
                </td>
                <td colspan="2"><label>Number</label>
                    <hr><input type="text" name="number1" id="">
                </td>
                <td colspan="2"><label>Ext</label>
                    <hr><input type="text" name="ext1" id="">
                </td>
            </tr>
        </table>
        <h6>Fax<i class="fa-solid fa-circle-plus"></i></h6>
        <h6>Email<i class="fa-solid fa-circle-plus"></i></h6>
        <input type="text" name="email1" id="">
        <h6>Website<i class="fa-solid fa-circle-plus"></i></h6>

    </fieldset>

</div>`)
    addbtn.classList.toggle("add-section");
}

function removeSection() {
    addbtn.lastChild.remove();
}







//put
/*
===


   
*/
