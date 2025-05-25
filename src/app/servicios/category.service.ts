import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDTO } from '../dto/message-dto';
import { CreateCategoryDTO } from '../dto/create-category-dto';
import { UpdateCategoryDTO } from '../dto/update-category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryURL = "http://localhost:8080/api/categories";

  constructor(private http: HttpClient) { }

  public create(createCategoryDTO: CreateCategoryDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(this.categoryURL, createCategoryDTO);
  }

  public update(updateCategoryDTO: UpdateCategoryDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(this.categoryURL, updateCategoryDTO);
  }

  public delete(id: string): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.categoryURL}/${id}`);
  }

  public get(id: string): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.categoryURL}/${id}`);
  }

  public list(): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(this.categoryURL);
  }
}

