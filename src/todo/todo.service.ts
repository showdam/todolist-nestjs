import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find(todo => todo.id === id);
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo({
      id: this.idCounter++,
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.todos.push(todo);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const existingTodo = this.todos[todoIndex];
    const updatedTodo = new Todo({
      ...existingTodo,
      ...updateTodoDto,
      updatedAt: new Date(),
    });

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  remove(id: number): void {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    this.todos.splice(todoIndex, 1);
  }
}