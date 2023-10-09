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
            cy.get('input').type(task)
            cy.get('[data-selector="add-task"]').click()

            cy.get('input').should('have.value', '')
            cy.get(`[data-selector="task-${task}"]`).should('exist')
        })
    })

    describe('Click on edit button', () => {
        it('Selected task should be active in input field, button should change title to "Edit" and selected task is not displayed in the list', () => {
        })

        it('Update task => edited task should display in the list', () => {
        })
    })

    it('Click on Delete Button => task should disappear from the list', () => {
    })
})
