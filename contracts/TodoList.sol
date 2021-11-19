pragma solidity ^0.8.10;

contract TodoList {
  struct List {
    string name;
    bool isCompleted;
  }

  event NewTodo(address, List[]);
  event TodoCompleted(address, List[]);

  mapping(address => List[]) public todos;

  function addTodo(string memory _name) public {
    todos[msg.sender].push(List(_name, false));

    emit NewTodo(msg.sender, todos[msg.sender]);
  }

  function completeTodo(uint8 _id) public {
    List storage list = todos[msg.sender][_id];
    list.isCompleted = true;

    emit TodoCompleted(msg.sender, todos[msg.sender]);
  }
  
  function getTodo(uint _id) public view returns (List memory) {
      return todos[msg.sender][_id];
  }
  
  function getTodosCount() public view returns (uint) {
      return todos[msg.sender].length;
  }
}