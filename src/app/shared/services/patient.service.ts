import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PatientService {

    private http = inject(HttpClient)

    addPatient(patientData):Observable<any> {
        const data = new FormData();
        data.append('apikey', environment.apikey)
        data.append('zipcode', patientData.zipcode)
        data.append('mobile', patientData.mobile)
        data.append('first_name', patientData.first_name)
        data.append('last_name', patientData.last_name)
        data.append('dob', patientData.dob)
        data.append('gender', patientData.gender)
        data.append('blood_group', patientData.blood_group)
        return this.http.post(environment.domain + 'fulfillment/patients/add', data)
    }

    getAllPatients():Observable<any>{
        return this.http.get(environment.localDomain+'api/patient')
    }
}