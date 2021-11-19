const { expect } = require('chai');
const { ethers } = require('hardhat');

var deployedTodoList;

beforeEach(async () => {
  const TodoList = await ethers.getContractFactory('TodoList');

  deployedTodoList = await TodoList.deploy();

  await deployedTodoList.addTodo('Test this contract');
});

describe('Todo List Contract', () => {
  it('should add new item to list', async () => {
    expect(await deployedTodoList.getTodosCount()).to.equal('1');
    expect(await deployedTodoList.getTodo(0)).to.deep.equal([
      'Test this contract',
      false,
    ]);
  });

  it('should complete a item', async () => {
    await deployedTodoList.completeTodo(0);

    expect(await deployedTodoList.getTodo(0)).to.deep.equal([
      'Test this contract',
      true,
    ]);
  });
});
