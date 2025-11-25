'use client';

import React from 'react';
import { useQuoteWizard } from '../../hooks/quote/useQuoteWizard';

export function QuoteWizard() {
  const {
    step,
    totalSteps,
    data,
    isLoading,
    error,
    success,
    nextStep,
    prevStep,
    updateData,
    submit,
  } = useQuoteWizard();

  if (success) {
    return (
      <div className="p-8 bg-green-100 text-green-700 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Quote Request Received!</h2>
        <p>We have received your request and will get back to you shortly with a detailed estimate.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Request a Quote</h2>
          <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-8">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Project Type</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {['website', 'ecommerce', 'webapp', 'mobile'].map((type) => (
                <button
                  key={type}
                  onClick={() => updateData({ projectType: type })}
                  className={`p-4 border rounded-lg text-left hover:border-indigo-500 ${
                    data.projectType === type ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'
                  }`}
                >
                  <span className="block font-medium capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Features</h3>
            <div className="space-y-2">
              {['SEO Optimization', 'CMS Integration', 'Payment Gateway', 'User Authentication'].map((feature) => (
                <label key={feature} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={data.features?.includes(feature)}
                    onChange={(e) => {
                      const features = data.features || [];
                      if (e.target.checked) {
                        updateData({ features: [...features, feature] });
                      } else {
                        updateData({ features: features.filter((f) => f !== feature) });
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={data.name || ''}
                onChange={(e) => updateData({ name: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                value={data.email || ''}
                onChange={(e) => updateData({ email: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="text"
                placeholder="Company (Optional)"
                value={data.company || ''}
                onChange={(e) => updateData({ company: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review</h3>
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <p><span className="font-medium">Type:</span> {data.projectType}</p>
              <p><span className="font-medium">Features:</span> {data.features?.join(', ')}</p>
              <p><span className="font-medium">Name:</span> {data.name}</p>
              <p><span className="font-medium">Email:</span> {data.email}</p>
              {data.company && <p><span className="font-medium">Company:</span> {data.company}</p>}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
        {step < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={
              (step === 1 && !data.projectType) ||
              (step === 3 && (!data.name || !data.email))
            }
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit Quote Request'}
          </button>
        )}
      </div>
    </div>
  );
}
