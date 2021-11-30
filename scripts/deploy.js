const main = async () => {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account: ', deployer.address);

  console.log('Account balance: ', (await deployer.getBalance()).toString());

  const TodoList = await ethers.getContractFactory('TodoList');
  const todoList = await TodoList.deploy();

  console.log('Todo List address:', todoList.address);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
