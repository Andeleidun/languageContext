import { useRef, useState } from 'react';
import { useLanguage } from './useLanguage';

const initialFormState = {
  feedback: '',
  rating: '',
  recommend: '',
};

export const FeedbackForm = ({ translations }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(initialFormState);
  const [submittedData, setSubmittedData] = useState([]);
  const [statusKey, setStatusKey] = useState('');
  const nextEntryId = useRef(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setStatusKey('');
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setStatusKey('formCleared');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { ...formData, id: nextEntryId.current };
    nextEntryId.current += 1;
    setSubmittedData((current) => [...current, entry]);
    setFormData(initialFormState);
    setStatusKey('feedbackSubmitted');
  };

  return (
    <section>
      <h2>{translations.feedbackTitle[language]}</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          {translations.feedbackLabel[language]}
          <textarea
            id="feedback"
            name="feedback"
            placeholder={translations.feedbackPlaceholder[language]}
            value={formData.feedback}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          {translations.ratingLabel[language]}
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              {translations.ratingPlaceholder[language]}
            </option>
            {Object.entries(translations.ratingOptions).map(([key, value]) => (
              <option value={key} key={key}>
                {value[language]}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend>{translations.recommendLabel[language]}</legend>
          <div className="radio-group">
            {Object.entries(translations.recommendOptions).map(
              ([key, value]) => (
                <label key={key}>
                  <input
                    id={`recommend-${key}`}
                    type="radio"
                    name="recommend"
                    value={key}
                    checked={formData.recommend === key}
                    onChange={handleChange}
                    required
                  />
                  {value[language]}
                </label>
              )
            )}
          </div>
        </fieldset>
        <div className="button-group">
          <button type="submit">{translations.submitButton[language]}</button>
          <button type="reset">{translations.resetButton[language]}</button>
        </div>
      </form>

      <p className="form-status" role="status" aria-atomic="true">
        {statusKey ? translations[statusKey][language] : ''}
      </p>

      <h2>{translations.submittedEntriesTitle[language]}</h2>
      {submittedData.length === 0 ? (
        <p>{translations.noSubmissions[language]}</p>
      ) : (
        <ul>
          {submittedData.map((entry) => (
            <li key={entry.id}>
              <div>
                <strong>{translations.feedbackLabel[language]}:</strong>
                {entry.feedback}
              </div>
              <div>
                <strong>{translations.ratingLabel[language]}:</strong>
                {translations.ratingOptions[entry.rating][language]}
              </div>
              <div>
                <strong>{translations.recommendLabel[language]}:</strong>
                {translations.recommendOptions[entry.recommend][language]}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
