import React, { useState } from 'react';
import { CATEGORIES } from '../data/mockData';
import { t } from '../lang';
import { useToast } from './Toast';

const categoryIconMap = {
  'Road Safety': 'traffic',
  'Public Lighting': 'lightbulb',
  'Flooding': 'water_damage',
  "Women's Safety": 'shield_person',
  'Health Concern': 'medical_services',
  'Waste and Sanitation': 'delete_sweep',
};

export function ReportIssuePage({ 
  lang = 'en',
  formData, 
  setFormData, 
  onProceedToAnalysis, 
  onPrefillSample 
}) {
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const isValid = Boolean(
    formData.category &&
    formData.location.trim().length >= 3 &&
    formData.description.trim().length >= 10
  );

  const handleCategorySelect = (categoryId) => {
    const selected = CATEGORIES.find(c => c.id === categoryId);
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      urgency: selected?.defaultUrgency || prev.urgency || 'Medium'
    }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please choose an image file (PNG, JPG, or similar).', 'error');
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image is too large. Please choose a file under 5MB.', 'error');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, imagePreview: reader.result, imageName: file.name }));
    };
    reader.onerror = () => {
      showToast('Could not read that image. Please try another file.', 'error');
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imagePreview: null, imageName: '' }));
  };

  const handleUseSamplePhoto = () => {
    setFormData(prev => ({
      ...prev,
      imagePreview: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      imageName: 'sample_crossing_hazard_photo.jpg'
    }));
  };

  const handleAppendTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description ? `${prev.description.trim()} [${tag}]` : `[${tag}] `
    }));
    if (errors.description) setErrors(prev => ({ ...prev, description: null }));
  };

  const handleGpsLocate = () => {
    setFormData(prev => ({
      ...prev,
      location: "Near St. Anthony's Gate & Gandhi Road Junction, Ward 14"
    }));
    if (errors.location) setErrors(prev => ({ ...prev, location: null }));
    showToast("GPS location verified: Ward 14, Zone 5 (Accurate to 4m)", "success");
  };

  const validateAndProceed = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.category) {
      newErrors.category = 'Please select an issue category.';
    }
    if (!formData.location || formData.location.trim().length < 3) {
      newErrors.location = 'Please provide a specific landmark or location.';
    }
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Please describe the hazard with at least 10 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setErrors({});
    onProceedToAnalysis();
  };

  return (
    <div className="flex flex-col gap-5 pb-28 pt-16 px-gutter-mobile">
      
      {/* Progress Stepper Header */}
      <div className="bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between gap-space-xs mb-2">
          {/* Step 1 */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm">
              1
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-primary font-bold">Describe</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant leading-none">விவரம்</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>

          {/* Step 2 */}
          <div className="flex items-center gap-1.5 opacity-55">
            <div className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-semibold">
              2
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Analyze</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant leading-none">பகுப்பாய்வு</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>

          {/* Step 3 */}
          <div className="flex items-center gap-1.5 opacity-40">
            <div className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-semibold">
              3
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Act</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant leading-none">நடவடிக்கை</span>
            </div>
          </div>
        </div>
        {/* Progress Meter */}
        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-secondary rounded-full w-1/3 transition-all duration-300"></div>
        </div>
      </div>

      {/* Bilingual Context Banner */}
      <div className="bg-surface-container-low rounded-xl p-3.5 flex items-start gap-3 shadow-sm">
        <div className="w-8 h-8 rounded-full bg-secondary-container/50 text-on-secondary-container flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            campaign
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-title-md text-title-md text-primary font-bold tracking-tight">
              Create Safety Brief: Report a Civic Concern
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider">Step 1/3</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            பாதுகாப்பு அறிக்கையை உருவாக்கு • Your observation directly assists local youth & civic dispatchers.
          </p>
        </div>
      </div>

      {/* FIELD 1: Issue Category Selection */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="font-label-lg text-label-lg text-primary flex items-center gap-1.5">
            <span>1. Issue Category</span>
            <span className="text-on-surface-variant font-normal font-label-sm text-label-sm">(வகைப்பாடு)</span>
          </label>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">Select 1</span>
        </div>

        {errors.category && (
          <p className="text-error text-xs font-semibold">{errors.category}</p>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 -mx-gutter-mobile px-gutter-mobile scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = formData.category === cat.id;
            const iconName = categoryIconMap[cat.name] || 'more_horiz';

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`category-chip flex-shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm transform active:scale-95'
                    : 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container'
                }`}
              >
                <span className={`material-symbols-outlined text-[19px] ${isSelected ? 'text-secondary-container' : 'text-on-surface-variant'}`} style={isSelected ? { fontVariationSettings: '"FILL" 1' } : {}}>
                  {iconName}
                </span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold leading-tight">{cat.name}</span>
                  <span className="text-[10px] leading-none">{cat.description}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FIELD 2: Location */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="font-label-lg text-label-lg text-primary flex items-center gap-1.5">
            <span>2. Location</span>
            <span className="text-on-surface-variant font-normal font-label-sm text-label-sm">(இடம்)</span>
          </label>
          <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            GPS Verified
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-2 flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-surface-container-low rounded-lg px-3 py-2.5 focus-within:bg-surface-container-lowest transition-colors">
            <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0">pin_drop</span>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, location: e.target.value }));
                if (errors.location) setErrors(prev => ({ ...prev, location: null }));
              }}
              placeholder="Search cross-streets, college gate, landmark..."
              className="bg-transparent w-full text-on-surface font-body-md text-body-md focus:outline-none placeholder:text-outline"
            />
            <button
              type="button"
              onClick={handleGpsLocate}
              aria-label="Auto detect location via GPS"
              title="GPS Auto-locate"
              className="p-1 rounded-full bg-secondary-container text-on-secondary-fixed flex-shrink-0 hover:opacity-90 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">my_location</span>
            </button>
          </div>
          {/* Inline mini-map GPS status confirmation */}
          <div className="w-full bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between border border-surface-container-high">
            <div className="flex items-center gap-1.5 truncate">
              <span className="material-symbols-outlined text-error text-[16px]">location_on</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                {formData.location ? `${formData.location} • Verified` : 'Ward 14, Zone 5 • GPS Geocoded'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleGpsLocate}
              className="text-secondary font-label-sm text-label-sm font-bold flex-shrink-0 hover:underline"
            >
              Update
            </button>
          </div>
          {errors.location && (
            <p className="text-error text-xs font-semibold px-1">{errors.location}</p>
          )}
          <p className="font-body-sm text-body-sm text-on-surface-variant px-1">
            Keep it specific so student commuters and ward responders can locate it safely without confusion.
          </p>
        </div>
      </section>

      {/* FIELD 3: What did you observe? */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="font-label-lg text-label-lg text-primary flex items-center gap-1.5">
            <span>3. What did you observe?</span>
            <span className="text-on-surface-variant font-normal font-label-sm text-label-sm">(விளக்கம்)</span>
          </label>
          <span className="font-label-sm text-label-sm text-on-surface-variant">{formData.description.length} chars</span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-3.5 flex flex-col gap-2">
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, description: e.target.value }));
              if (errors.description) setErrors(prev => ({ ...prev, description: null }));
            }}
            placeholder="Describe what occurred, any hazards, affected school or transit paths..."
            className="w-full bg-surface-container-low rounded-lg p-3 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest placeholder:text-outline resize-none transition-colors"
          />
          {errors.description && (
            <p className="text-error text-xs font-semibold">{errors.description}</p>
          )}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Suggested:</span>
            <button
              type="button"
              onClick={() => handleAppendTag('Missing Signage')}
              className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-container-highest transition-colors active:scale-95"
            >
              + Missing Signage
            </button>
            <button
              type="button"
              onClick={() => handleAppendTag('High Dispersal Rush')}
              className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-container-highest transition-colors active:scale-95"
            >
              + High Dispersal Rush
            </button>
            <button
              type="button"
              onClick={() => handleAppendTag('Blind Turn')}
              className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-container-highest transition-colors active:scale-95"
            >
              + Blind Turn
            </button>
          </div>
        </div>
      </section>

      {/* FIELD 4: Urgency Level */}
      <section className="flex flex-col gap-2">
        <label className="font-label-lg text-label-lg text-primary flex items-center gap-1.5">
          <span>4. Urgency Level</span>
          <span className="text-on-surface-variant font-normal font-label-sm text-label-sm">(அவசர நிலை)</span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          {/* Routine Option */}
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, urgency: 'Low' }))}
            className={`urgency-option flex flex-col items-start p-3.5 rounded-xl transition-all text-left ${
              formData.urgency === 'Low'
                ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                : 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Routine
              </span>
              <span className="material-symbols-outlined text-[18px] text-outline">
                {formData.urgency === 'Low' ? 'radio_button_checked' : 'radio_button_unchecked'}
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold mt-1">General Issue</span>
            <span className="font-body-sm text-[11px] text-on-surface-variant leading-snug mt-0.5">Can be queued for weekly civil assessment.</span>
          </button>

          {/* Urgent / Immediate Risk */}
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, urgency: 'High' }))}
            className={`urgency-option flex flex-col items-start p-3.5 rounded-xl transition-all text-left ${
              formData.urgency === 'High'
                ? 'bg-error-container/40 text-on-error-container shadow-sm'
                : 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-surface-bright animate-ping"></span>
                Immediate Risk
              </span>
              <span className="material-symbols-outlined text-[18px] text-error" style={{ fontVariationSettings: '"FILL" 1' }}>
                {formData.urgency === 'High' ? 'radio_button_checked' : 'radio_button_unchecked'}
              </span>
            </div>
            <span className="font-label-md text-label-md text-error font-extrabold mt-1">Urgent Attention</span>
            <span className="font-body-sm text-[11px] text-on-error-container leading-snug mt-0.5">Direct risk to student pedestrians today.</span>
          </button>
        </div>
      </section>

      {/* FIELD 5: Evidence / Image Upload */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="font-label-lg text-label-lg text-primary flex items-center gap-1.5">
            <span>5. Photo Evidence</span>
            <span className="text-on-surface-variant font-normal font-label-sm text-label-sm">(புகைப்படம்)</span>
          </label>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">
            {formData.imagePreview ? '1 File Attached' : 'Optional'}
          </span>
        </div>

        {!formData.imagePreview ? (
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex flex-col gap-3">
            <div className="border-2 border-dashed border-surface-container-high rounded-xl p-5 text-center">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant mx-auto mb-2">cloud_upload</span>
              <div className="text-xs sm:text-sm text-on-surface-variant">
                <label htmlFor="file-upload" className="font-semibold text-secondary hover:underline cursor-pointer">
                  Click to upload an image
                </label>
                <span> or drag and drop</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1">PNG, JPG up to 5MB</p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleUseSamplePhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-on-surface bg-surface-container border border-surface-container-high hover:bg-surface-container-highest shadow-sm"
                >
                  Use Sample Hazard Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-surface-container-low rounded-lg p-2.5">
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-surface-container shadow-xs">
                <img
                  src={formData.imagePreview}
                  alt="Hazard evidence preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-primary font-semibold truncate">
                    {formData.imageName || 'Attached evidence'}
                  </span>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-1 rounded-full bg-error-container text-on-error-container hover:bg-error transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Ready for AI visual verification</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FIELD 6: Anonymous Reporting Switch */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary-container/40 text-on-secondary-fixed flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">visibility_off</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-label-lg text-label-lg text-primary font-bold">Anonymous Reporting</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-[9px] font-bold uppercase tracking-wider">
                {formData.isAnonymous ? 'Active' : 'Inactive'}
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium mt-0.5">அடையாளம் மறைக்க • Submit Anonymously</span>
            <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-snug">
              Your name and student enrollment ID will stay encrypted. Public safety briefs display your community trust tier without personal identity.
            </p>
          </div>
        </div>
        {/* Modern Toggle Switch */}
        <button
          id="anonToggle"
          role="switch"
          type="button"
          aria-checked={formData.isAnonymous}
          aria-label="Toggle anonymous reporting"
          onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
          className={`w-12 h-7 rounded-full relative p-0.5 flex-shrink-0 cursor-pointer transition-colors shadow-inner mt-1 ${
            formData.isAnonymous ? 'bg-primary' : 'bg-surface-container-highest'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full bg-secondary-container shadow-sm transform transition-transform flex items-center justify-center ${
              formData.isAnonymous ? 'translate-x-5' : 'translate-x-0'
            }`}
          >
            <span className="material-symbols-outlined text-on-secondary-fixed text-[14px]">
              {formData.isAnonymous ? 'lock' : 'lock_open'}
            </span>
          </span>
        </button>
      </section>

      {/* FIELD 7: Preferred Language Selector */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-surface-container text-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">translate</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-primary font-bold">Preferred Brief Language</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">அறிக்கையின் மொழி</span>
          </div>
        </div>
        <div className="inline-flex items-center p-1 rounded-full bg-surface-container text-on-surface text-xs font-bold">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, language: 'en' }))}
            className={`px-3 py-1 rounded-full transition-all ${
              formData.language === 'en'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, language: 'ta' }))}
            className={`px-3 py-1 rounded-full transition-all ${
              formData.language === 'ta'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </section>

      {/* Micro Civic Trust Assurance */}
      <div className="flex items-center justify-center gap-2 text-on-surface-variant py-1">
        <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
        <span className="font-label-sm text-label-sm">Protected by KuralGuard Civic Verifier • 256-bit Student Guard</span>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-space-sm pt-space-md">
        <button
          type="button"
          onClick={validateAndProceed}
          aria-label="Submit report and proceed to AI analysis"
          className="w-full py-3.5 px-space-md rounded-xl bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-space-xs shadow-lg active:scale-[0.99] transition-transform"
        >
          <span>Continue to AI Analysis</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        {onPrefillSample && (
          <button
            type="button"
            onClick={onPrefillSample}
            aria-label="Pre-fill sample scenario"
            className="w-full py-2.5 text-center font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Pre-fill sample scenario</span>
          </button>
        )}
      </div>

    </div>
  );
}
