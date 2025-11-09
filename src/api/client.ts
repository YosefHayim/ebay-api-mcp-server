import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { EbayConfig, EbayApiError } from '../types/ebay.js';
import { EbayOAuthClient } from '../auth/oauth.js';
import { getBaseUrl } from '../config/environment.js';

/**
 * Base client for making eBay API requests
 */
export class EbayApiClient {
  private httpClient: AxiosInstance;
  private authClient: EbayOAuthClient;
  private baseUrl: string;

  constructor(config: EbayConfig) {
    this.authClient = new EbayOAuthClient(config);
    this.baseUrl = getBaseUrl(config.environment);

    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Add request interceptor to inject auth token
    this.httpClient.interceptors.request.use(
      async (config) => {
        const token = await this.authClient.getAccessToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error) && error.response?.data) {
          const ebayError: EbayApiError = error.response.data;
          const errorMessage = ebayError.errors?.[0]?.longMessage ||
            ebayError.errors?.[0]?.message ||
            error.message;
          throw new Error(`eBay API Error: ${errorMessage}`);
        }
        throw error;
      }
    );
  }

  /**
   * Make a GET request to eBay API
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.httpClient.get<T>(endpoint, { params });
    return response.data;
  }

  /**
   * Make a POST request to eBay API
   */
  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.post<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * Make a PUT request to eBay API
   */
  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    const response = await this.httpClient.put<T>(endpoint, data);
    return response.data;
  }

  /**
   * Make a DELETE request to eBay API
   */
  async delete<T = any>(endpoint: string): Promise<T> {
    const response = await this.httpClient.delete<T>(endpoint);
    return response.data;
  }

  /**
   * Check if client is authenticated
   */
  isAuthenticated(): boolean {
    return this.authClient.isAuthenticated();
  }
}
