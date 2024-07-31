import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
	selector: 'app-details',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './details.component.html',
	styleUrl: './details.component.css'
})
export class DetailsComponent {
	route: ActivatedRoute = inject(ActivatedRoute);
	housingLocationId: number = -1;
	housingLocation?: HousingLocation;
	housingService: HousingService = inject(HousingService);
	applyForm = new FormGroup({
		firstName: new FormControl(''),
		lastName: new FormControl(''),
		email: new FormControl(''),
	});

	constructor() {
		const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
		this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
			this.housingLocation = housingLocation;
		});
	}

	submitApplication() {
		this.housingService.submitApplication(
			this.applyForm.value.firstName ?? '',
			this.applyForm.value.lastName ?? '',
			this.applyForm.value.email ?? '',
		);
	}

}
