import {
  Story,
  StoryContext
} from '@storybook/react/dist/ts3.9/client/preview/types-6-0'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'

export const RouterDecorator = (
  story: () => Story,
  { parameters: { router } }: StoryContext
) => {
  if (!router) {
    return (
      <div>
        <BrowserRouter>{story()}</BrowserRouter>
      </div>
    )
  }

  const { path, route } = router

  return (
    <MemoryRouter initialEntries={[encodeURI(route)]}>
      <Routes>
        <Route path={path} element={story()} />
      </Routes>
    </MemoryRouter>
  )
}
