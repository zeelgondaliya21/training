create table patient(
	patient_id varchar(15) primary key,
	firstName varchar(20) not null,
	lastName varchar(20) not null,
	middleName varchar(20),
	dob date not null,
	gender_id varchar(10) not null,
	race_id varchar(10) not null,
);



create table chart(
	patient_id varchar(15) not null,
	chart_id serial primary key,
	chart_no numeric not null,
	chart_number numeric generated always as concat(chart_id,chart_no) stored,
	constraint fk_chart
    	foreign key (patient_id) 
	  		references patient(patient_id)
);



create table chart2(
	patient_id varchar(15) not null,
	chart_id serial primary key,
	chart_no numeric not null,
	chart_number numeric generated always as stored,
	constraint fk_chart
    	foreign key (patient_id) 
	  		references patient(patient_id)
);



create table gender(
	gender_id varchar(10) primary key,
	patient_id varchar(15) not null,
	sex varchar(10) check(sex in ('Male','Female','Unknown')),
	constraint fk_gender
    	foreign key (patient_id) 
	  		references patient(patient_id)
);



create table racePatient(
	race_id  varchar(10) primary key,
	patient_id varchar(15) not null,
	race varchar(10) check(race in ('Asian','American','African')),
	constraint fk_race
    	foreign key(patient_id) 
	  		references patient(patient_id)
);



create table address(
	patient_id varchar(15) not null,
	address_id varchar(10) primary key,
	street varchar(15) not null,
	city varchar(15) not null,
	state varchar(15) not null,
	country varchar(15) not null,
	zip  numeric(8) not null,
	address_type numeric(5) not null,
	primary_address_status boolean default false,
	constraint fk_address
    	foreign key(patient_id) 
	  		references patient(patient_id)
);



create table address_type(
	address_type_id varchar(10) primary key,
	address_id varchar(5),
	address_type_desc varchar(10) not null,
	constraint fk_address_id
    	foreign key(address_id) 
	  		references address(address_id)
);



create table address_type(
	address_type_id varchar(10) primary key,
	address_id varchar(5),
	address_type_desc varchar(10) not null,
	constraint fk_address_id
    	foreign key(address_id) 
	  		references address(address_id)
);



create table fax(
	address_id varchar(5) not null,
	fax_id varchar(5) primary key,
	primary_fax_status boolean default false,
	constraint fk_fax
    	foreign key (address_id) 
	  		references address(address_id)
);



create table phone(
	phone_id numeric(5) primary key,
	address_id varchar(5) not null,
	phone_code numeric(5) not null,
	phone_number numeric(10) not null,
	constraint fk_phone
    	foreign key(address_id) 
	  		references address(address_id)
);



create table phone_type(
	phone_id numeric(5) not null,
	phone_type_id varchar(5) primary key,
	phone_type_desc varchar(10) not null,
	constraint fk_phone_type
    	foreign key(phone_id) 
	  		references phone(phone_id)
);



create table phone(
	phone_id numeric(5) primary key,
	address_id varchar(5) not null,
	phone_code numeric(5) not null,
	phone_number numeric(10) not null,
	primary_phone_status boolean default false,
	constraint fk_phone
    	foreign key(address_id) 
	  		references address(address_id)
);



create table phone_type(
	phone_id numeric(5) not null,
	phone_type_id varchar(5) primary key,
	phone_type_desc varchar(10) not null,
	constraint fk_phone_type
    	foreign key(phone_id) 
	  		references phone(phone_id)
);



insert into patient values (1,'channing','martin','b','02-10-2001');
insert into race_patient values (11,1,'American');
insert into gender values (12,1,'Male');
insert into chart (chart_id,patient_id,chart_no) values (13,1,101);
insert into address values (1,1,'heaven','surat','gujarat','india','395004',True);
insert into address_type values (1,1,'Home');
insert into phone values (14,1,91,9978901114,true);
insert into phone_type values (14,1,'Landline');
insert into fax values (1,3672,true);

insert into patient values (2,'zeel','gondaliya','b','01-10-2001');
insert into race_patient values (2,2,'Asian');
insert into gender values (17,2,'Male');
insert into chart (chart_id,patient_id,chart_no) values (18,2,101);
insert into address values (2,2,'hell','ahmedabad','gujarat','india','395004',True);
insert into address_type values (2,2,'Home');
insert into phone values (19,2,91,9978901167,true);
insert into phone_type values (19,2,'Landline');
insert into fax values (2,3435,true);

insert into patient values (3,'zeel','gondaliya','b','01-10-2001');
insert into race_patient values (3,3,'African');
insert into gender values (21,3,'Male');
insert into chart (chart_id,patient_id,chart_no) values (22,3,105);
insert into address values (3,3,'sola','rajkot','gujarat','india','395456',True);
insert into address_type values (3,3,'Home');
insert into phone values (23,3,91,9976781167,true);
insert into phone_type values (23,3,'Cell');
insert into fax values (3,3935,true);
update patient set lastname='musk' where patient_id = '3';
update patient set dob='03-04-1989' where patient_id = '3';



--Assignment2
--1---
create view demographics as(
	select p.firstname,p.lastname,p.middlename,p.dob,g.sex,r.race,c.chart_number,a.street,a.city,a.state,a.country,a.zip,ph.phone_number ,f.fax_id 
	from patient p
	inner join gender g 
	on p.patient_id =g.patient_id 
	inner join race_patient r
	on p.patient_id =r.patient_id 
	inner join chart c 	
	on p.patient_id = c.patient_id 
	inner join
    address a on p.patient_id =a.patient_id 
	inner join phone as ph
	on p.patient_id  = a.patient_id 
	and a.address_id = ph.address_id 
	inner join fax  as f
	on p.patient_id  = a.patient_id 
	and a.address_id = f.address_id
);


select * from demographics;
select * from patient ;




--2---
select firstname, lastname, dob, sex, count((firstname)) as "Count" from demographics group by firstname,lastname, dob, sex;
select firstname, lastname, dob, sex, count((lastname)) as "Count" from demographics group by firstname,lastname, dob, sex;
select firstname, lastname, dob, sex, count((dob)) as "Count" from demographics group by firstname,lastname, dob, sex;
select firstname, lastname, dob, sex, count((sex)) as "Count" from demographics group by firstname,lastname, dob, sex;
select firstname, lastname, dob, sex, count(concat(firstname ,lastname,dob,sex)) from demographics group by firstname,lastname, dob, sex;




--5---
create view demographics2 as(
	select p.firstname,p.lastname,p.middlename,p.dob,p.patient_id,g.sex,g.gender_id,r.race,r.race_id ,c.chart_number,c.chart_id ,a.street,a.city,a.state,a.country,a.zip,a.address_id ,ph.phone_number,ph.phone_id ,f.fax_id
	from patient p
	inner join gender g 
	on p.patient_id = g.patient_id 
	inner join race_patient r
	on p.patient_id = r.patient_id 
	inner join chart c 	
	on p.patient_id = c.patient_id 
	inner join address a 
    on p.patient_id = a.patient_id 
	inner join phone ph 
	on p.patient_id  = a.patient_id 
	and a.address_id = ph.address_id 
	inner join fax f
	on p.patient_id  = a.patient_id 
	and a.address_id = f.address_id
);
select * from demographics2;

create or replace function get_patient_info(phonenumber varchar)
returns table (firstname varchar, middlename varchar, lastname varchar, dob date, sex varchar, race varchar, street varchar, city varchar, state varchar, country varchar, phone_number varchar, fax_id varchar)
language plpgsql
as
$$
declare
begin
	return query select d.firstname, d.middlename, d.lastname, d.dob, g.sex, r.race, a.street, a.city, a.state, a.country, ph.phone_number, f.fax_id
		from
		demographics2 d
		left join gender g 
		on d.patient_id= g.patient_id 
		left join race_patient r 
		on d.patient_id  = r.patient_id
		left join address a 
		on d.patient_id  = a.patient_id  
		left join phone ph 
		on d.patient_id = a.patient_id 
		and a.address_id = ph.address_id 
		left join fax f 
		on d.patient_id = a.patient_id
		and a.address_id = f.address_id 
		where ph.phone_number = phonenumber;
end;
$$;
drop function get_patient_info;

select get_patient_info('9978901114');




--3---
create or replace function insert_info(pid varchar(15), fn varchar(50), mn varchar(50), ln varchar(50), db date )
returns int
language plpgsql
as
$$
declare
	newpk integer;
begin 
	insert into patient(patient_id, firstname, middlename, lastname, dob) values(pid,fn, mn, ln, db);
	select patient_id into newpk from patient order by patient_id;
	return newpk;
end;
$$;
drop function insert_info;

select insert_info(4::varchar,'priyank'::varchar,'m'::varchar,'donda'::varchar,'10-2-2001'::date);
select * from patient;




--4--
create or replace function get_patient_info2(search varchar(50),page integer, size integer)
returns table (firstname varchar, middlename varchar, lastname varchar, dob date, sex varchar, race varchar, street varchar, city varchar, state varchar, country varchar, phone_number varchar, fax_id varchar)
language plpgsql
as
$$
declare
begin
	return query select d.firstname, d.middlename, d.lastname, d.dob, g.sex, r.race, a.street, a.city, a.state, a.country, ph.phone_number, f.fax_id
		from
		demographics2 d
		left join gender g 
		on d.patient_id = g.patient_id  
		left join race_patient r 
		on d.patient_id  = r.patient_id 
		left join address a 
		on d.patient_id  = a.patient_id  
		left join phone ph 
		on d.patient_id = a.patient_id 
		and a.address_id = ph.address_id 
		left join fax f 
		on d.patient_id = a.patient_id 
		and a.address_id  = f.address_id 
		where d.firstname = search 
		or d.lastname = search 
		or g.sex = search
		order by d.firstname,d.lastname,d.sex,d.dob
		limit size
		offset ((page-1)*size);
end;
$$;

select get_patient_info2('Male'::varchar,1,4);