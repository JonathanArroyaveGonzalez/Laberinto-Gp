# REACT NOTAS

## Componentes funcionales

Es una funcion de js que acepta props como argumento y devuelven un jsx

## props y estados

propiedades y state

- props : son propiedades o argumentos que se le pueden pasar de los componentes padres a los hijos - son inmutables - la props se pueden utilizar para pasarc componentes hijos a otros componentes
  a traves de la prop especial children
- state : Es una caracteristica importante en react que nos permite manipular y mantener los datos en el tiempo
- props drilling : proceso de pasar los datos de un componente a otro a traves de la estructura de arbol de componentes

## Hooks

Los hooks no permiten manipular los datos de los componentes funcionales es decir funciones que enganchan los componentes
y estados de estos, tiene una gran utilidad porque se permite extraer la logica de los componentes

- usestate: definir un estado local de una manera sencilla y directa , devuelve un array [valor actual,funcion actualizacion]
- useefect : permite realizar efectos secundarios en los componentes funcionales - el primer argumentos es una funcion del efecto secundario - el segundo argumento un array de dependencias, react rastrarea las dependencias - si el array [] es vacio solo se ejecutara una vez
    **

## Events

acciones en la aplicacion clicks,teclas,cambios de estado etc
event building : como se los eventso se propagan a traves de la estructura de arbol de componentes
