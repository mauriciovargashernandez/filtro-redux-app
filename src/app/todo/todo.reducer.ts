import * as todoActions from './todo.actions';
import { Todo } from './models/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el mundo');
const todo3 = new Todo('Pedir prestado el traje de Ironman');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer( state = estadoInicial, action: todoActions.Acciones ): Todo[] {
  switch ( action.type ) {

    case todoActions.AGREGAR_TODO:
      const todo = new Todo( action.texto );
      return [ ...state, todo ];

    case todoActions.TOGGLE_TODO:
      return state.map( todoEdit => {
        if ( todoEdit.id === action.id ) {
          return {
            ...todoEdit,
            completado: !todoEdit.completado
          };
        } else {
          return todoEdit;
        }
      });

    case todoActions.TOGGLE_ALL_TODO:
      return state.map( todoEdit => {
        return {
          ...todoEdit,
          completado: action.completado
        };
      });

    case todoActions.EDITAR_TODO:
      return state.map( todoEdit => {
        if ( todoEdit.id === action.id ) {
          return {
            ...todoEdit,
            texto: action.texto
          };
        } else {
          return todoEdit;
        }
      });

    case todoActions.BORRAR_TODO:
      return state.filter( todoEdit => todoEdit.id !== action.id);

    case todoActions.BORRAR_ALL_TODO:
      return state.filter( todoEdit => !todoEdit.completado );

    default:
      return state;
  }
}

// El operador spread (...) clona todas las propiedades del elemento y luego puedo agregarle los cambios que
// necesito colocando una coma y posterior cada elemento que quiero cambiar

// En este caso se ve al .map como un for each, ya que recorre todos los elementos del state






