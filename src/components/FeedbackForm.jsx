import React, { useContext, useState } from 'react';
import { LanguageContext } from './LanguageContext';

export const FeedbackForm = ({ translations }) => {
  const { language } = useContext(LanguageContext);
  const initialFormState = {
    feedback: '',
    rating: '',
    recommend: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({
      feedback: '',
      rating: '',
      recommend: '',
    });
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  return (
    <div>
      <h2>{translations.feedbackTitle[language]}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="feedback">
            {translations.feedbackLabel[language]}
          </label>
          <textarea
            id="feedback"
            name="feedback"
            placeholder={translations.feedbackPlaceholder[language]}
            value={formData.feedback}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rating">{translations.ratingLabel[language]}</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="">{translations.ratingLabel[language]}</option>
            <option value="excellent">
              {translations.ratingOptions.excellent[language]}
            </option>
            <option value="good">
              {translations.ratingOptions.good[language]}
            </option>
            <option value="average">
              {translations.ratingOptions.average[language]}
            </option>
            <option value="poor">
              {translations.ratingOptions.poor[language]}
            </option>
          </select>
        </div>
        <div>
          <fieldset>
            <legend>{translations.recommendLabel[language]}</legend>
            <div className="radio-group">
              <label>
                <input
                  id="recommendYes"
                  type="radio"
                  name="recommend"
                  value="yes"
                  checked={formData.recommend === 'yes'}
                  onChange={handleChange}
                />
                {translations.recommendOptions.yes[language]}
              </label>
              <label>
                <input
                  id="recommendNo"
                  type="radio"
                  name="recommend"
                  value="no"
                  checked={formData.recommend === 'no'}
                  onChange={handleChange}
                />
                {translations.recommendOptions.no[language]}
              </label>
            </div>
          </fieldset>
        </div>
        <div>
          <div className="button-group">
            <button type="submit">{translations.submitButton[language]}</button>
            <button type="reset" onClick={handleReset}>
              {translations.resetButton[language]}
            </button>
          </div>
        </div>
      </form>

      <h2>{translations.submittedEntriesTitle[language]}</h2>
      <ul>
        {submittedData.map((entry, index) => (
          <li key={index}>
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
    </div>
  );
};
