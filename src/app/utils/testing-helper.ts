import { By } from '@angular/platform-browser'
import { ComponentFixture } from '@angular/core/testing'
import { DebugElement } from '@angular/core'

/**
 * find element
 */

export function testIdSelector(testId: string): string {
  return `[data-testid="${testId}"]`
}

export function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
  return fixture.debugElement.query(By.css(testIdSelector(testId)))
}

/**
 * specs
 */

export function expectText<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  text: string
): void {
  const element = findEl(fixture, testId)
  const actualText = element.nativeElement.textContent.trim()
  expect(actualText).toBe(text)
}

/**
 * set element
 */

export function dispatchFakeEvent(
  element: EventTarget,
  type: string,
  bubbles: boolean = false
): void {
  const event = document.createEvent('Event')
  event.initEvent(type, bubbles, false)
  element.dispatchEvent(event)
}

export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string
): void {
  element.value = value
  const isSelect = element instanceof HTMLSelectElement
  dispatchFakeEvent(element, isSelect ? 'change' : 'input', isSelect ? false : true)
}

export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string
): void {
  setFieldElementValue(findEl(fixture, testId).nativeElement, value)
}

export function setBlur<T>(fixture: ComponentFixture<T>, testId: string): void {
  dispatchFakeEvent(findEl(fixture, testId).nativeElement, 'blur', true)
}
