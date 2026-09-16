import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { translations } from './data/translations';

test('renders saved semantic choices in the newly selected language', async () => {
  const user = userEvent.setup();
  render(<App loadTranslations={() => Promise.resolve(translations)} />);

  await screen.findByRole('heading', { name: 'User Feedback' });
  await user.type(screen.getByLabelText('Your feedback'), 'Clear example');
  await user.selectOptions(screen.getByLabelText('Rate our service'), 'good');
  await user.click(screen.getByLabelText('Yes'));
  await user.click(screen.getByRole('button', { name: 'Submit Feedback' }));

  await user.selectOptions(
    screen.getByLabelText('Choose your preferred language:'),
    'es'
  );

  const savedEntry = screen.getByRole('listitem');
  expect(within(savedEntry).getByText('Clear example')).toBeInTheDocument();
  expect(within(savedEntry).getByText('Bueno')).toBeInTheDocument();
  expect(within(savedEntry).getByText('Sí')).toBeInTheDocument();
  expect(within(savedEntry).queryByText('Good')).not.toBeInTheDocument();
});
