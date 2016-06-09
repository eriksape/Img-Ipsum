import expect from 'expect'
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}


describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: 'ADD_TODO',
      text
    }
    expect(addTodo(text)).toEqual(expectedAction)
  })
})
