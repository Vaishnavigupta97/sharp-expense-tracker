import { render, screen } from "@testing-library/react"
import Welcome from "./Welcome"
import authStore from "../../store/reducerStore"
import { Provider } from "react-redux"
const initialState = {}; // Set your initial state here if needed
const mockStore = createStore(() => initialState);

test('render welcome message', () => {
  render(
    <Provider store={mockStore}>
      <Welcome />
    </Provider>
  )
const msgElement=screen.getByText("your profile is incomplete",{exact:false})
expect(msgElement).toBeInTheDocument()
})

