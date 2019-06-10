import { ApiDomain, FieldSchemaViewModel, FieldValueProviderViewModel, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { ReduxAction, PackagePathPayload, GetAvailableFieldsSuccessPayload, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload, FieldActions, FieldRequests, GetSingleEntityPayload, AdditionalPathsMeta } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from './custom-http-url-encoding-codec';
import { PageResponseExtensions } from './page-response-extensions';
import { Injectable, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgFieldRequests implements FieldRequests {

  protected retryTimes = 3;

  constructor(
    protected http: HttpClient,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
  ) {
  }

  public getPaged(action: ReduxAction<GetPagedEntitiesPayload, AdditionalPathsMeta>): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<FieldSchemaViewModel, string>> | ReduxAction<HttpErrorResponse>> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    let query = '';
    let sort = '';

    if (action.payload.pagedQuery.rsqlFilter) {
      query = action.payload.pagedQuery.rsqlFilter.toList().build();
      if (query && query.length > 0) {
        queryParameters = queryParameters.set('query', query);
      }
    }

    if (action.payload.pagedQuery.sort) {
      sort = action.payload.pagedQuery.sort.build();
      if (sort && sort.length > 0) {
        queryParameters = queryParameters.set('sort', sort);
      }
    }

    if (action.payload.pagedQuery.pageNumber && action.payload.pagedQuery.pageNumber > 1) {
      queryParameters = queryParameters.set('pageNumber', action.payload.pagedQuery.pageNumber.toString());
    }

    if (action.payload.pagedQuery.pageSize && action.payload.pagedQuery.pageSize > 0) {
      queryParameters = queryParameters.set('pageSize', action.payload.pagedQuery.pageSize.toString());
    }

    let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;
    url = this.addAdditionalPaths(url, action.meta.additionalPaths);
    url = url + '/fields';

    return this.http.get<FieldSchemaViewModel[]>(url, { observe: 'response', params: queryParameters })
      .pipe(
        map(httpResponse => {
          return Object.assign({}, new ReduxAction<GetPagedEntitiesSuccessPayload<FieldSchemaViewModel, string>, AdditionalPathsMeta>({
            type: FieldActions.FIELD_GET_PAGED_SUCCESS,
            payload: {
              entities: httpResponse.body ? httpResponse.body : [],
              packagePath: action.payload.packagePath,
              page: PageResponseExtensions.getPageResponse<string>(httpResponse.headers, httpResponse.body.map(record => record.key), query, sort),
              pagedQuery: action.payload.pagedQuery
            },
            meta: {
              additionalPaths: action.meta.additionalPaths
            }
          }));
        }),
        retry(this.retryTimes),
        catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
          type: FieldActions.FIELD_GET_PAGED_FAILURE,
          payload: error,
          error: true
        }))))
      );
  }

  public getSingle = (action: ReduxAction<GetSingleEntityPayload<string>, AdditionalPathsMeta>): Observable<ReduxAction<GetSingleEntitySuccessPayload<FieldSchemaViewModel, string>> | ReduxAction<HttpErrorResponse>> => {
    let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;
    url = this.addAdditionalPaths(url, action.meta.additionalPaths);
    url = `${url}/fields/${action.payload.id}`;

    return this.http.get<FieldSchemaViewModel>(url, { observe: 'response' })
      .pipe(
        map(httpResponse => {
          return Object.assign({}, new ReduxAction<GetSingleEntitySuccessPayload<FieldSchemaViewModel, string>, AdditionalPathsMeta>({
            type: FieldActions.FIELD_GET_SINGLE_SUCCESS,
            payload: {
              id: action.payload.id,
              entity: httpResponse.body,
              packagePath: action.payload.packagePath
            },
            meta: {
              additionalPaths: action.meta.additionalPaths
            }
          }));
        }),
        retry(this.retryTimes),
        catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
          type: FieldActions.FIELD_GET_SINGLE_FAILURE,
          payload: error,
          error: true
        }))))
      );
  }

  public getAvailableFields(action: ReduxAction<PackagePathPayload, AdditionalPathsMeta>): Observable<ReduxAction<GetAvailableFieldsSuccessPayload> | ReduxAction<HttpErrorResponse>> {
    let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;
    url = this.addAdditionalPaths(url, action.meta.additionalPaths);
    url = `${url}/fields-available`;

    return this.http.get<FieldValueProviderViewModel[]>(url, { observe: 'response' }).pipe(
      map(httpResponse => Object.assign({}, new ReduxAction<GetAvailableFieldsSuccessPayload, AdditionalPathsMeta>({
        type: FieldActions.FIELD_GET_AVAILABLE_FIELDS_SUCCESS,
        payload: {
          availableFields: httpResponse.body ? httpResponse.body : [],
          packagePath: action.payload.packagePath
        },
        meta: {
          additionalPaths: action.meta.additionalPaths
        }
      }))),
      catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
        type: FieldActions.FIELD_GET_AVAILABLE_FIELDS_FAILURE,
        payload: error,
        error: true
      }))))
    );
  }

  protected addAdditionalPaths(url: string, additionalPaths: string[]) {
    return additionalPaths ? [url, ...additionalPaths].join('/') : url;
  }
}
