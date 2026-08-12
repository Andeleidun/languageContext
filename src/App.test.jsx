import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';
import { translations } from './data/translations';

function resolvedTranslations() {
  return Promise.resolve(translations);
}

test('loads translations and switches the visible and document language', async () => {
  const user = userEvent.setup();
  render(<App loadTranslations={resolvedTranslations} />);

  expect(screen.getByRole('status')).toHaveTextContent(
    'Loading translations...'
  );
  expect(
    await screen.findByRole('heading', {
      level: 1,
      name: 'React Language Context Tutorial',
    })
  ).toBeInTheDocument();

  await user.selectOptions(
    screen.getByLabelText('Choose your preferred language:'),
    'es'
  );

  expect(document.documentElement).toHaveAttribute('lang', 'es');
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Tutorial de Contexto de Idiomas en React',
    })
  ).toBeInTheDocument();
});

test('submits valid feedback and exposes the result as a status message', async () => {
  const user = userEvent.setup();
  render(<App loadTranslations={resolvedTranslations} />);

  await screen.findByRole('heading', { name: 'User Feedback' });
  await user.type(screen.getByLabelText('Your feedback'), 'Helpful example');
  await user.selectOptions(screen.getByLabelText('Rate our service'), 'good');
  await user.click(screen.getByLabelText('Yes'));
  await user.click(screen.getByRole('button', { name: 'Submit Feedback' }));

  expect(screen.getByRole('status')).toHaveTextContent('Feedback submitted.');
  const submittedEntry = screen.getByRole('listitem');
  expect(
    within(submittedEntry).getByText('Helpful example')
  ).toBeInTheDocument();
  expect(within(submittedEntry).getByText('Good')).toBeInTheDocument();

  await user.selectOptions(
    screen.getByLabelText('Choose your preferred language:'),
    'es'
  );
  expect(screen.getByRole('status')).toHaveTextContent(
    'Retroalimentación enviada.'
  );
});

test('shows a recoverable error when translation loading fails', async () => {
  const user = userEvent.setup();
  const loadTranslations = vi
    .fn()
    .mockRejectedValueOnce(new Error('synthetic failure'))
    .mockResolvedValueOnce(translations);

  render(<App loadTranslations={loadTranslations} />);

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Translations could not be loaded.'
  );
  await user.click(screen.getByRole('button', { name: 'Try again' }));

  expect(
    await screen.findByRole('heading', {
      name: 'React Language Context Tutorial',
    })
  ).toBeInTheDocument();
  expect(loadTranslations).toHaveBeenCalledTimes(2);
});

test('handles a loader that throws before returning a promise', async () => {
  const loadTranslations = () => {
    throw new Error('synthetic synchronous failure');
  };

  render(<App loadTranslations={loadTranslations} />);

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Translations could not be loaded.'
  );
});

test('ignores a stale result from a loader that ignores cancellation', async () => {
  let resolveObsoleteRequest;
  const obsoleteLoader = () =>
    new Promise((resolve) => {
      resolveObsoleteRequest = resolve;
    });
  const currentTranslations = {
    ...translations,
    main: {
      ...translations.main,
      appTitle: {
        ...translations.main.appTitle,
        en: 'Current translation bundle',
      },
    },
  };
  const { rerender } = render(<App loadTranslations={obsoleteLoader} />);

  rerender(
    <App loadTranslations={() => Promise.resolve(currentTranslations)} />
  );
  expect(
    await screen.findByRole('heading', { name: 'Current translation bundle' })
  ).toBeInTheDocument();

  await act(async () => resolveObsoleteRequest(translations));
  expect(
    screen.getByRole('heading', { name: 'Current translation bundle' })
  ).toBeInTheDocument();
});
