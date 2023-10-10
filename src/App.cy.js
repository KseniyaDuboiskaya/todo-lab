import { mount } from 'cypress/react'
import App from './App'

describe('App', () => {
    it('Mount component => should display app header', () => {
        mount(<App />)
        cy.get('[data-selector="app-header"]').should('exist')
    })

    describe('Enter task in input field', () => {
        it('Input value should be updated', () => {
            const task = 'Implement add todo feature'
            mount(<App />)
            cy.get('input').should('not.have.value', task)
            cy.get('input').type(task)
            cy.get('input').should('have.value', task)
        })

        it('Add Task button should be enabled', () => {
            const task = 'Implement add todo feature'
            mount(<App />)
            cy.get('[data-selector="add-task"]').should('be.disabled')

            cy.get('input').type(task)
            cy.get('[data-selector="add-task"]').should('not.be.disabled')
        })

        it('Click on Add Task button => task should be added in the list and input value has been cleaned up', () => {
            const task = 'Implement add todo feature'
            mount(<App />)
            cy.get(`[data-selector="task-${task}"]`).should('not.exist')
            cy.get('input').type(task)
            cy.get('[data-selector="add-task"]').click()

            cy.get('input').should('have.value', '')
            cy.get(`[data-selector="task-${task}"]`).should('exist')
        })
    })

    describe('Click on edit button', () => {
        it('Selected task should be active in input field and button changed title to "Edit" and task is not displayed in the list', () => {
            const task = 'Implement add todo feature'
            mount(<App />)
            cy.get('input').type(task)
            cy.get('[data-selector="add-task"]').click()
            cy.get('[data-selector="add-task"]').contains('Add Task').should('exist')

            cy.get(`[data-selector="task-${task}"]`).get('[data-selector="edit-task"]').click()
            cy.get('[data-selector="add-task"]').contains('Edit Task').should('exist')
            cy.get('input').should('have.value', task)
            cy.get(`[data-selector="task-${task}"]`).should('not.exist')
        })

        it('Update task => updated task should display in the list', () => {
            const task = 'Implement add todo feature'
            const updatedTask = 'Updated task'
            mount(<App />)
            cy.get('input').type(task)
            cy.get('[data-selector="add-task"]').click()
            cy.get(`[data-selector="task-${task}"]`).get('[data-selector="edit-task"]').click()
            cy.get('input').type('{selectAll}{backspace}')
            cy.get('input').type(updatedTask)
            cy.get('[data-selector="add-task"]').click()
            cy.get(`[data-selector="task-${updatedTask}"]`).should('exist')
            cy.get(`[data-selector="task-${task}"]`).should('not.exist')
        })
    })

    it('Click on Delete Button => task should disappear from the list', () => {
        const task = 'Implement add todo feature'
        mount(<App />)
        cy.get('input').type(task)
        cy.get('[data-selector="add-task"]').click()
        cy.get(`[data-selector="task-${task}"]`).should('exist')

        cy.get(`[data-selector="task-${task}"]`).get('[data-selector="delete-task"]').click()
        cy.get(`[data-selector="task-${task}"]`).should('not.exist')
    })
})
