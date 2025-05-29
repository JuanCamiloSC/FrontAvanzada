import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDTO } from '../dto/message-dto';
import { CreateCategoryDTO } from '../dto/create-category-dto';
import { UpdateCategoryDTO } from '../dto/update-category-dto';
import { CategoryDTO } from '../dto/category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryURL = "http://localhost:8080/api/categories";

  constructor(private http: HttpClient) { }

  // ✅ Retorna la categoría creada
  public create(createCategoryDTO: CreateCategoryDTO): Observable<MessageDTO<CategoryDTO>> {
    return this.http.post<MessageDTO<CategoryDTO>>(this.categoryURL, createCategoryDTO);
  }

  // ✅ Retorna la categoría actualizada
  public update(updateCategoryDTO: UpdateCategoryDTO): Observable<MessageDTO<CategoryDTO>> {
    return this.http.put<MessageDTO<CategoryDTO>>(this.categoryURL, updateCategoryDTO);
  }

  // ✅ Retorna un string con mensaje de éxito
  public delete(id: string): Observable<MessageDTO<string>> {
    return this.http.delete<MessageDTO<string>>(`${this.categoryURL}/${id}`);
  }

  // ✅ Retorna una sola categoría
  public get(id: string): Observable<MessageDTO<CategoryDTO>> {
    return this.http.get<MessageDTO<CategoryDTO>>(`${this.categoryURL}/${id}`);
  }

  // ✅ Retorna una lista de categorías
  public list(): Observable<MessageDTO<CategoryDTO[]>> {
    return this.http.get<MessageDTO<CategoryDTO[]>>(this.categoryURL);
  }
}
