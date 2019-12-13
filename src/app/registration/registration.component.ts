import { Component } from '@angular/core';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

    public statusCount:number = 0;
    public registrationTitle:string = "Personal Information"
    
    submitRegistration(){
        console.log('registration', this.statusCount);
        this.statusCount++;
    }
}
