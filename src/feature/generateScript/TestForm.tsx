import {
  ComponentAProps,
  ComponentBProps,
  ComponentCProps,
  ComponentProps,
} from "./ComponentTypes"

export const TestForm = () => {
  const props: ComponentProps = {
    foo: "test",
    bar: 123,
    baz: true,
  }

  const Foo = getRandomComponent()
  return (
    <>
      <h1>Test Form</h1>
      <Foo {...props} />
    </>
  )
}

const getRandomComponent = () => {
  const randomNumber = getRandomInt(3)

  if (randomNumber === 1) {
    return componentA
  }

  if (randomNumber === 2) {
    return componentB
  }

  if (randomNumber === 3) {
    return componentC
  }

  return componentC
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max)
}

const componentA = (props: ComponentAProps) => (
  <>
    <h3>Component A: {props.foo}</h3>
  </>
)

const componentB = (props: ComponentBProps) => (
  <>
    <h3>Component B: {props.bar}</h3>
  </>
)

const componentC = (props: ComponentCProps) => (
  <>
    <h3>Component C: {props.baz}</h3>
  </>
)
