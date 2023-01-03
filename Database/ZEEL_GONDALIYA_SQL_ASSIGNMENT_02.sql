
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
