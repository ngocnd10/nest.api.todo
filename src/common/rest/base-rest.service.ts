import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export abstract class BaseRestService {
  protected get apiUrl(): string {
    return '';
  }

  protected get additionalHttpHeaders(): any {
    return null;
  }

  public constructor(protected httpService: HttpService) {}

  public get<TResponse>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<TResponse>> {
    return this.httpService.get<TResponse>(`${this.apiUrl}${url}`, this.getAxiosRequestConfig(config));
  }

  public post<TBody, TResponse>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<TResponse>> {
    return this.httpService.post<TResponse>(`${this.apiUrl}${url}`, data, this.getAxiosRequestConfig(config));
  }

  public put<TBody, TResponse>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<TResponse>> {
    return this.httpService.put<TResponse>(`${this.apiUrl}${url}`, data, this.getAxiosRequestConfig(config));
  }

  public delete<TResponse>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<TResponse>> {
    return this.httpService.delete<TResponse>(`${this.apiUrl}${url}`, this.getAxiosRequestConfig(config));
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
