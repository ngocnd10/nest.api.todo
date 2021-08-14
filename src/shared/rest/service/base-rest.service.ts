import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export abstract class BaseRestService {
  protected get apiUrl(): string {
    return '';
  }

  protected get additionalHttpHeaders(): any {
    return null;
  }

  public constructor(protected httpService: HttpService) {}

  public get<TResponse>(url: string, config?: AxiosRequestConfig): Observable<TResponse> {
    return this.httpService
      .get<TResponse>(`${this.apiUrl}${url}`, this.getAxiosRequestConfig(config))
      .pipe(map((res: AxiosResponse<TResponse>) => res.data));
  }

  public post<TBody, TResponse>(url: string, data?: TBody, config?: AxiosRequestConfig): Observable<TResponse> {
    return this.httpService
      .post<TResponse>(`${this.apiUrl}${url}`, data, this.getAxiosRequestConfig(config))
      .pipe(map((res: AxiosResponse<TResponse>) => res.data));
  }

  public put<TBody, TResponse>(url: string, data?: TBody, config?: AxiosRequestConfig): Observable<TResponse> {
    return this.httpService
      .put<TResponse>(`${this.apiUrl}${url}`, data, this.getAxiosRequestConfig(config))
      .pipe(map((res: AxiosResponse<TResponse>) => res.data));
  }

  public delete<TResponse>(url: string, config?: AxiosRequestConfig): Observable<TResponse> {
    return this.httpService
      .delete<TResponse>(`${this.apiUrl}${url}`, this.getAxiosRequestConfig(config))
      .pipe(map((res: AxiosResponse<TResponse>) => res.data));
  }

  protected getAxiosRequestConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    const axiosRequestConfig = {
      ...config,
    };
    if (this.additionalHttpHeaders != null) {
      axiosRequestConfig.headers = Object.assign({}, axiosRequestConfig.headers, this.additionalHttpHeaders);
    }
    return axiosRequestConfig;
  }
}
