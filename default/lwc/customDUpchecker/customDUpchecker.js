import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class CustomDupChecker extends LightningElement {
    @api recordId;
    email = '';
    isDuplicate = false;
    showResult = false;

    handleInputChange(event) {
        this.email = event.target.value;
    }

    @wire(getRecord, { recordId: '$recordId', fields: [EMAIL_FIELD] })
    contactRecord;

    handleButtonClick() {
        // Get the email value from the contact record
        const existingEmail = getFieldValue(this.contactRecord.data, EMAIL_FIELD);

        // Check if the email value matches the user input
        const isDuplicate = existingEmail === this.email;

        // Show result to user
        this.isDuplicate = isDuplicate;
        this.showResult = true;
    }
}








