
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
        //console.log(typeof (t.dob));
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
    //calculate age from date of birth
    let dob = new Date(pdata.dob);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = year - 1970;

    if (age < 18) {
        window.alert(`Please add a contact for the Patient as ${pdata.Sex == "Male" ? "he" : "she"}, is a minor.`)
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
            mode: 'cors',
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
        //console.log(id);
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
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

}
//reset form data
document.getElementById("formfinal").reset();



var leftshowcontent = document.getElementById("sideshow");
var sidebarCollapse = document.getElementById("sidebar-collapse").classList;
var expand = document.getElementById("maindiv");

//sidebar hide and show
function sidebarShow() {
    // console.log(leftshowcontent);
    leftshowcontent.classList.toggle("hide-sidebar");
    expand.classList.toggle("expand-main");
    sidebarCollapse.toggle("change-icon-180");
}


//other info hide and show
var othershowcontent = document.getElementById("other-in");
var otherCollapse = document.getElementById("othersection").classList;
function otherInfoShow() {
    // console.log(othershowcontent);
    othershowcontent.classList.toggle("hide-otherinfo");
    otherCollapse.toggle("change-icon-90");
/*    if (othershowcontent.classList.contains("fa-solid fa-circle-chevron-down")) {
       othershowcontent.classList.remove("fa-solid fa-circle-chevron-down");
        othershowcontent.classList.add("fa-solid fa-circle-chevron-up")
    }
    else {
        othershowcontent.classList.remove("fa-solid fa-circle-chevron-up");
        othershowcontent.classList.add("fa-solid fa-circle-chevron-down");
    }*/
}

//adding and deleting address panel
var addbtn = document.getElementById("sec12");
var faxRemove = document.getElementById("add-fax");
var emailRemove = document.getElementById("add-email");
var webRemove = document.getElementById("add-website");
function addSection(contact) {
    contact.parentElement.parentElement.nextElementSibling.insertAdjacentHTML(
        'beforeend',
        `
                                     <div id="form1">
                                        <fieldset class="fieldset-contact">
                                            <legend class="contact-legend">
                                                <select name="home" id="add1">
                                                    <option>Home</option>
                                                    <option>Work</option>
                                                    <option>Other</option>
                                                </select>
                                                <div style="display:flex; padding-top:10px;">
                                                    <div style="font-size:16px;">Address</div>
                                                    <div style="font-size:16px;"><i class="fa-solid fa-trash-can" onclick="removeSection(this)" id="trashbin"></i></div>
                                                </div>


                                            </legend>
                                            <div>
                                                <label style="font-size: 16px; font-family:WebImsLato,sans-serif;">Street</label><br><input type="text" name="street1" id="">

                                                <div style="display:flex; font-size:13px; margin-top:10px;">
                                                    <div style="width:24.7%;">Zip</div>
                                                    <div style="width:25%;">City</div>
                                                    <div style="width:24.5%;">State</div>
                                                    <div style="width:24.5%;">Country</div>

                                                </div>

                                                <div style="display:flex;">
                                                    <div style="width:24%; margin-right:10px;">
                                                        <input type="text" />
                                                    </div>
                                                    <div style="width:24%; margin-right:10px;">
                                                        <input type="text" />
                                                    </div>
                                                    <div style="width: 24%; margin-right: 10px;">
                                                        <select name="code1" id="code1">
                                                            <option>California</option>
                                                            <option>Pensilvenia</option>
                                                            <option>Florida</option>
                                                        </select>
                                                    </div>
                                                    <div style="width: 24%;">
                                                        <select name="code1" id="code1">
                                                            <option>India</option>
                                                            <option>US</option>
                                                            <option>Canada</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <i class="fa-solid fa-trash-can" onclick="removeSectionLocation(this)"></i>
                                                    </div>
                                                </div>
                                            </div>


                                                <div class="phone-header">
                                                    <div><h6>Phone<i class="fa-solid fa-circle-plus" onclick="addPhone(this)"></i></h6></div>
                                                    <div style="display:flex; font-size:13px;">
                                                        <div style="width:25%;">Type</div>
                                                        <div style="width:25%;">Code</div>
                                                        <div style="width:25%;">Number</div>
                                                        <div style="width:25%;">Ext.</div>
                                                    </div>
                                                    <hr />
                                                    <div style="display:flex; margin-top:10px;">
                                                        <div style="width:25%; margin-right:10px;">
                                                            <select name="type1" id="type">
                                                                <option>Call</option>
                                                                <option>Landline</option>
                                                            </select>
                                                        </div>
                                                        <div style="width: 25%; margin-right: 10px;">
                                                            <select name="code1" id="code1">
                                                                <option>+1(US)</option>
                                                                <option>+91(Ind)</option>
                                                                <option>+7(Rus)</option>
                                                            </select>
                                                        </div>
                                                        <div style="width: 25%; margin-right: 10px;">
                                                            <input type="text" name="number1" id="">
                                                        </div>
                                                        <div style="width: 25%; display:flex;">
                                                            <input type="text" name="ext1" id="" />
                                                        </div>
                                                        <div>
                                                            <i class="fa-solid fa-trash-can" onclick="removeSectionPhone(this)"></i>
                                                        </div>

                                                    </div>
                                                </div>

                                                <h6>Fax<i class="fa-solid fa-circle-plus" onclick="addFax(this)"></i></h6>
                                                <h6>Email<i class="fa-solid fa-circle-plus" onclick="addEmail(this)"></i></h6>
                                                <div>
                                                    <div style="display:flex;"><input type="text"><i class="fa-solid fa-trash-can" onclick="removeSectionEmail(this)"></i></div>
                                                </div>

                                                <h6>Website<i class="fa-solid fa-circle-plus" onclick="addWebsite(this)"></i></h6>

                                        </fieldset>
                                    </div>
        `
    );
}

function addSectionLocation(location) {
    location.parentElement.parentElement.nextElementSibling.insertAdjacentHTML(
        'beforeend', `
        <div>
                                                <label style="font-size: 16px; font-family:WebImsLato,sans-serif;">Street</label><br><input type="text" name="street1" id="">

                                                <div style="display:flex; font-size:13px; margin-top:10px;">
                                                    <div style="width:24.7%;">Zip</div>
                                                    <div style="width:25%;">City</div>
                                                    <div style="width:24.5%;">State</div>
                                                    <div style="width:24.5%;">Country</div>

                                                </div>

                                                <div style="display:flex;">
                                                    <div style="width:24%; margin-right:10px;">
                                                        <input type="text" />
                                                    </div>
                                                    <div style="width:24%; margin-right:10px;">
                                                        <input type="text" />
                                                    </div>
                                                    <div style="width: 24%; margin-right: 10px;">
                                                        <select name="code1" id="code1">
                                                            <option>California</option>
                                                            <option>Pensilvenia</option>
                                                            <option>Florida</option>
                                                        </select>
                                                    </div>
                                                    <div style="width: 24%;">
                                                        <select name="code1" id="code1">
                                                            <option>India</option>
                                                            <option>US</option>
                                                            <option>Canada</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <i class="fa-solid fa-trash-can" onclick="removeSectionLocation(this)"></i>
                                                    </div>
                                                </div>
                                            </div>
`
    );
}

function addPhone(phone) {
    phone.parentElement.parentElement.parentElement.insertAdjacentHTML(
        'beforeend',`
                                            <div style="display:flex; margin-top:10px;">
                                                <div style="width:25%; margin-right:10px;">
                                                    <select name="type1" id="type">
                                                        <option>Call</option>
                                                        <option>Landline</option>
                                                    </select>
                                                </div>
                                                <div style="width: 25%; margin-right: 10px">
                                                    <select name="code1" id="code1">
                                                        <option>+1(US)</option>
                                                        <option>+91(Ind)</option>
                                                        <option>+7(Rus)</option>
                                                    </select>
                                                </div>
                                                <div style="width: 25%; margin-right: 10px;">
                                                    <input type="text" name="number1" id="">
                                                </div>
                                                <div style="width: 25%; display:flex;">
                                                    <input type="text" name="ext1" id="" />
                                                </div>
                                                <div>
                                                    <i class="fa-solid fa-trash-can" onclick="removeSectionPhone(this)"></i>
                                                </div>
                                                
                                            </div>
    `);
}

function addFax(fax) {
    fax.parentElement.insertAdjacentHTML(
        "beforeend",
        `<div style="display:flex;"><input type="text"><i style="font-size:20px;" class="fa-solid fa-trash-can" onclick="removeSectionFax(this)"></i></div>`);
}
function addEmail(email) {
    email.parentElement.nextElementSibling.insertAdjacentHTML(
        'beforeend',
        `<div style="display:flex;"><input type="text"><i class="fa-solid fa-trash-can" onclick="removeSectionEmail(this)"></i></div>`);
}
function addWebsite(web) {
    web.parentElement.insertAdjacentHTML(
        'beforeend',
        `<div style="display:flex;"><input type="text"><i style="font-size:20px;" class="fa-solid fa-trash-can" onclick="removeSectionWeb(this)"></i></div>`);
}

function removeSection(contactdelete) {
    contactdelete.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
}
function removeSectionPhone(phonedelete) {
    phonedelete.parentElement.parentElement.remove();
    if (phonedelete.parentElement.parentElement == null) {
        phonedelete.parentElement.parentElement.children[1].remove();
    }
}


function removeSectionFax(faxdelete) {
    faxdelete.parentElement.remove();
}


function removeSectionEmail(emaildelete) {
    emaildelete.parentElement.remove();
}

function removeSectionWeb(webdelete) {
    webdelete.parentElement.remove();
}

function removeSectionLocation(locationdelete) {
    console.log(locationdelete.parentElement.parentElement.parentElement.parentElement.children[0].children[1]);    
    locationdelete.parentElement.parentElement.parentElement.remove();
    locationdelete.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].insertAdjacentHTML('beforeend', `<i class="fa-solid fa-circle-plus" onclick="addSectionLocation(this)"></i>`);

}

function enableFeeSchedule() {
    if (document.getElementById('selfpaycheck').checked) {
        console.log("inside if");
        document.getElementById('FeesSchedule').setAttribute("disabled", false);
    }
    else {
        document.getElementById('FessSchedule').setAttribute("disabled", true);
    }
}

