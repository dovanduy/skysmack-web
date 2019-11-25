import { Component, OnInit } from '@angular/core';
import { SubscriptionHandler, AvailablePackage } from '@skysmack/framework';
import { of, BehaviorSubject } from 'rxjs';
import { convertObservableToBehaviorSubject } from '@skysmack/ng-framework';

@Component({
  selector: 'ss-commercial-tenants-packages',
  templateUrl: './commercial-tenants-packages.component.html',
  styleUrls: ['./commercial-tenants-packages.component.scss']
})
export class CommercialTenantsPackagesComponent implements OnInit {
  private subscriptionHandler = new SubscriptionHandler();
  private availablePackages$: BehaviorSubject<AvailablePackage[]>;
  public selectedPackages: AvailablePackage[] = [null];

  constructor(
  ) { }

  ngOnInit() {
    this.availablePackages$ = convertObservableToBehaviorSubject(of(this.getMockData()), []);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public getDependentPackages(packageType: string): AvailablePackage[] {
    if (!packageType || packageType.length === 0) {
      return this.availablePackages$.getValue().filter(_package => !_package.dependencyTypes || _package.dependencyTypes && _package.dependencyTypes.length === 0);
    } else {
      return this.availablePackages$.getValue().filter(_package => _package.dependencyTypes && _package.dependencyTypes.includes(packageType));
    }
  }

  public clearPackageLists(index: number = 1): void {
    if (index >= 1) {
      this.selectedPackages = this.selectedPackages.slice(0, index);
    }
  }

  public selectPackage(packageType: string, index: number) {
    this.clearPackageLists(index + 1);
    const availablePackages = this.availablePackages$.getValue();
    // Do magic
    const match = availablePackages.find(_package => _package.type === packageType);
    this.selectedPackages = this.selectedPackages.concat([match]);
  }

  private getMockData(): AvailablePackage[] {
    return JSON.parse('[{ "name": "3CX", "category": "Integrations", "description": "3CX service integrations.", "type": "dff4ba98-b174-44bf-9636-31a57109a4ef", "dependencyTypes": ["5607d333-3af2-4689-8b56-46c5fa2b6fa9"] }, { "name": "Access-policies", "category": "Security", "description": "Manage access-policies and permisisons.", "type": "6dc73a60-daad-412c-a1f2-62b882158228", "dependencyTypes": [] }, { "name": "Cash payments", "category": "Sales", "description": "Processes cash payments", "type": "7416b55f-4436-4f64-8ae2-7581ea686a1b", "dependencyTypes": ["0e485267-6282-4e45-87f7-157de421d30b"] }, { "name": "CORS", "category": "Hosting", "description": "CORS management", "type": "4b36c8aa-4756-4507-919e-77af61cceaf4", "dependencyTypes": [] }, { "name": "Emails", "category": "Messaging", "description": "Handles email templates and uses features to send emails.", "type": "d3d64c46-c21f-4e08-a1f5-6f39cd944436" }, { "name": "File storage", "category": "Utilities", "description": "Upload and download files.", "type": "eaa8a62f-cbcf-4fb0-b104-d13b3756825a", "dependencyTypes": [] }, { "name": "Identities", "category": "Entities", "description": "Manage users and roles.", "type": "e05c2897-7d84-46b5-876a-290d1105c7fc" }, { "name": "Identities persons adaptor", "category": "Adaptors", "description": "Connect identities to persons.", "type": "36f23d4a-b997-4d83-bc03-dfa35f14f1a5", "dependencyTypes": ["e05c2897-7d84-46b5-876a-290d1105c7fc", "38ffd3ad-91a8-44d4-a71a-fd2f478ebd18"] }, { "name": "Invoice template feature", "category": "Sales", "description": "Templates for making invoice PDFs or emails.", "type": "5a48737f-2de5-45ec-aec2-d87f5b2f2172", "dependencyTypes": ["0e485267-6282-4e45-87f7-157de421d30b"] }, { "name": "Invoices", "category": "Sales", "description": "Invoices for sales.", "type": "0e485267-6282-4e45-87f7-157de421d30b" }, { "name": "Invoices lodging reservations adaptor", "category": "Adaptors", "description": "Connect invoices to lodging reservations.", "type": "02ebc5fb-5459-45a2-a53c-ba83a3504aa2", "dependencyTypes": ["0e485267-6282-4e45-87f7-157de421d30b", "80d31d3c-aeb0-4570-8f1d-12f1be6a6710"] }, { "name": "Invoices products adaptor", "category": "Sales", "description": "Connecting products to baskets.", "type": "bc9cdc2b-78ad-4713-8c56-a964a13c8946", "dependencyTypes": ["0e485267-6282-4e45-87f7-157de421d30b", "ab77bcdc-b144-44cc-af10-df8532ef167e"] }, { "name": "Lodging reservations", "category": "Accommodation", "description": "Management of reservations and stays in lodgings.", "type": "80d31d3c-aeb0-4570-8f1d-12f1be6a6710", "dependencyTypes": ["f381ca87-1afa-4e30-958c-d6d0e8d5e53b"] }, { "name": "Lodgings", "category": "Management", "description": "Lodgings management for accommodation, ex. hotel rooms, rental houses etc.", "type": "f381ca87-1afa-4e30-958c-d6d0e8d5e53b" }, { "name": "Lodgings reservations emails adaptor", "category": "Adaptors", "description": "Connect lodgings reservations to emails.", "type": "788e9760-2b7d-4f23-8010-3c114a6a6952", "dependencyTypes": ["80d31d3c-aeb0-4570-8f1d-12f1be6a6710", "d3d64c46-c21f-4e08-a1f5-6f39cd944436"] }, { "name": "Lodgings reservations rate pricing", "category": "Sales", "description": "Manage rate price for reservations", "type": "1bb6c888-a217-4a53-b1f8-8f0d19138e19", "dependencyTypes": ["80d31d3c-aeb0-4570-8f1d-12f1be6a6710"] }, { "name": "Maintenance", "category": "Utilities", "description": "Maintenance tracking system for all types of entities.", "type": "355b7b36-1d39-4590-9f57-b4721b12d50c" }, { "name": "Maintenance lodgings adaptor", "category": "Adaptors", "description": "Connect maintenance to lodgings.", "type": "c6efb07a-6778-4889-a87d-5ecb7879ffa4", "dependencyTypes": ["355b7b36-1d39-4590-9f57-b4721b12d50c", "f381ca87-1afa-4e30-958c-d6d0e8d5e53b"] }, { "name": "Maintenance lodgings-reservations adaptor", "category": "Adaptors", "description": "Connect maintenance to lodging-reservations.", "type": "6b7a0804-cf0d-4160-a8bb-25bb729e8bba", "dependencyTypes": ["c6efb07a-6778-4889-a87d-5ecb7879ffa4", "80d31d3c-aeb0-4570-8f1d-12f1be6a6710"] }, { "name": "OAuth2", "category": "Security", "description": "OAuth2 authentication", "type": "e9d53bca-2906-4130-959b-c9928d73c66c", "dependencyTypes": ["e05c2897-7d84-46b5-876a-290d1105c7fc"] }, { "name": "Open API", "category": "Support", "description": "Enables Open API documentation", "type": "09389833-f051-4285-8e38-c71a37f4968d" }, { "name": "Packages", "category": "Hosting", "description": "Manage packages", "type": "eb633f67-076f-4df5-bcad-8c8a8c9fcee8" }, { "name": "Person", "category": "Entities", "description": "A group of people, ex customers, employees etc.", "type": "38ffd3ad-91a8-44d4-a71a-fd2f478ebd18" }, { "name": "Person baskets adaptor", "category": "Adaptors", "description": "Connect persons to baskets.", "type": "08d0f1d9-8363-462c-a9a9-54045cff2bf8", "dependencyTypes": ["0e485267-6282-4e45-87f7-157de421d30b", "38ffd3ad-91a8-44d4-a71a-fd2f478ebd18"] }, { "name": "Persons lodging reservations adaptor", "category": "Adaptors", "description": "Connect persons to lodging reservations.", "type": "0924b44c-974f-4dcf-9a0e-16ddfbe492a2", "dependencyTypes": ["38ffd3ad-91a8-44d4-a71a-fd2f478ebd18", "80d31d3c-aeb0-4570-8f1d-12f1be6a6710"] }, { "name": "Phones", "category": "Entities", "description": "Information and logging for phones.", "type": "5607d333-3af2-4689-8b56-46c5fa2b6fa9", "dependencyTypes": [] }, { "name": "Phones Invoices adapter", "category": "Adapters", "description": "Connect phones to invoices.", "type": "0482ddee-b413-46a8-98a9-b2c3a186ef86", "dependencyTypes": ["5607d333-3af2-4689-8b56-46c5fa2b6fa9", "0e485267-6282-4e45-87f7-157de421d30b"] }, { "name": "Phones Lodgings adapter", "category": "Adapters", "description": "Connect phones to lodgings.", "type": "794314ae-af03-4974-b324-6817e2d76a15", "dependencyTypes": ["5607d333-3af2-4689-8b56-46c5fa2b6fa9", "f381ca87-1afa-4e30-958c-d6d0e8d5e53b"] }, { "name": "Product", "category": "Entities", "description": "A group of products sharing the same type of properties", "type": "ab77bcdc-b144-44cc-af10-df8532ef167e" }, { "name": "Product prices", "category": "Sales", "description": "Add prices to products", "type": "ef1e9fb1-e079-4909-991e-6265ee4d1a9d", "dependencyTypes": ["ab77bcdc-b144-44cc-af10-df8532ef167e"] }, { "name": "Reservations pricings", "category": "Sales", "description": "Add prices to reservations.", "type": "02ec5ad2-9f08-4702-aa93-fe8a5be34481", "dependencyTypes": ["80d31d3c-aeb0-4570-8f1d-12f1be6a6710"] }, { "name": "SignalR", "category": "Events", "description": "SignalR events and notifications distribution.", "type": "03a6779c-0628-469a-ac37-4940e4be3d30", "dependencyTypes": [] }, { "name": "SiteMinder", "category": "Integrations", "description": "SiteMinder service integrations.", "type": "20d09d2e-8ce2-4aad-9d85-cf4b57d8adde", "dependencyTypes": ["02ebc5fb-5459-45a2-a53c-ba83a3504aa2", "0924b44c-974f-4dcf-9a0e-16ddfbe492a2"] }, { "name": "Smtp emails", "category": "Messaging", "description": "Send emails using SMTP.", "type": "a0b76bc0-28e1-4074-ba3e-1ac080c551ad", "dependencyTypes": ["d3d64c46-c21f-4e08-a1f5-6f39cd944436"] }, { "name": "Templates", "category": "Utilities", "description": "Template definitions for displaying data in various formats.", "type": "0592e90c-ceaa-4287-868e-7914a407cf62" }, { "name": "Terminal payments", "category": "Sales", "description": "Processes credit card terminal payments", "type": "51da6074-7d5f-4a98-b6ad-497894a7bdd3", "dependencyTypes": ["e05c2897-7d84-46b5-876a-290d1105c7fc", "0e485267-6282-4e45-87f7-157de421d30b"] }, { "name": "Webhooks", "category": "Hosting", "description": "Webhooks management", "type": "088043f5-0fe4-4508-a660-bf4eb80d317c", "dependencyTypes": [] }]');
  }
}
