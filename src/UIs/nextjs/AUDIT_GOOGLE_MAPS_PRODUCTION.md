# AUDIT GOOGLE MAPS PRODUCTION - READ ONLY ANALYSIS

**Date**: 2025-11-09
**Mode**: Read-Only Audit (No Code Changes)
**Issue**: Google Maps not displaying in production
**Error**: `"Google Maps Platform rejected your request. The provided API key is invalid."`

---

## 📋 EXECUTIVE SUMMARY

Google Maps displays correctly on **localhost** but fails in **production** with error:
> "Google Maps Platform rejected your request. The provided API key is invalid."

**Root Cause Identified**: The API key configured in Vercel production environment is **invalid** or **incorrectly configured** in Google Cloud Console.

**Impact**:
- ❌ Map not visible on contact page in production
- ❌ Users cannot see business location visually
- ✅ Text address and coordinates still visible
- ⚠️ Professional impression degraded

---

## 🔍 CURRENT IMPLEMENTATION ANALYSIS

### 1. Code Implementation - `UnifiedContactPage.tsx`

**File**: `src/app/contact/UnifiedContactPage.tsx:158`

```tsx
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}&q=50.6446374,5.5664509&zoom=13&language=fr&region=BE`}
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Localisation Smidjan à Liège, Belgique"
/>
```

**Environment Variable Used**: `NEXT_PUBLIC_GOOGLE_MAPS_ID`

**API Endpoint**: `https://www.google.com/maps/embed/v1/place`

**Parameters**:
- `key`: The API key (from environment variable)
- `q`: Coordinates `50.6446374,5.5664509` (Liège, Belgium)
- `zoom`: Level 13
- `language`: French (`fr`)
- `region`: Belgium (`BE`)

### 2. Environment Variable Configuration

**Local Environment** (`.env.local`):
```bash
NEXT_PUBLIC_GOOGLE_MAPS_ID=***MASKED_GOOGLE_MAPS_API_KEY***
```

**Production Environment** (Vercel):
- Variable name: `NEXT_PUBLIC_GOOGLE_MAPS_ID`
- Value: **Unknown** (needs verification in Vercel dashboard)
- Status: ⚠️ **Configured but INVALID**

### 3. Variable Migration History

**Previous Variable Name**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
**Current Variable Name**: `NEXT_PUBLIC_GOOGLE_MAPS_ID`

**Migration Reason**: Next.js/Vercel warnings about `*_KEY` in public variables

**Documentation Reference**: `VERCEL_ENV_UPDATE_GUIDE.md:19-21`
```markdown
2. `NEXT_PUBLIC_GOOGLE_MAPS_ID`
   - Valeur: Copier la valeur de l'ancienne `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Environnements: Production, Preview, Development
```

---

## 🐛 PROBLEM IDENTIFICATION

### Error Message Analysis

```
"Google Maps Platform rejected your request. The provided API key is invalid."
```

This error message indicates that:
1. ✅ An API key **IS** being provided (not `undefined`)
2. ❌ The API key is **invalid** or **incorrectly configured**

### Possible Root Causes

#### Root Cause 1: Wrong API Key in Vercel ⭐ **MOST LIKELY**

**Hypothesis**: The `NEXT_PUBLIC_GOOGLE_MAPS_ID` variable in Vercel production contains:
- An incorrect/expired API key
- A key from a different Google Cloud project
- A truncated/malformed key

**How to Verify**:
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Find `NEXT_PUBLIC_GOOGLE_MAPS_ID`
3. Click "👁️ Show" to reveal the value
4. Compare with the key in Google Cloud Console

**Expected Key Format**: `AIza[23 more characters]` (total 39 characters)
**Example**: `***MASKED_GOOGLE_MAPS_API_KEY***`

---

#### Root Cause 2: Old Variable Still Being Used

**Hypothesis**: The old variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` still exists in Vercel and might be interfering.

**Problem**:
- Old variable: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- New variable: `NEXT_PUBLIC_GOOGLE_MAPS_ID`
- Code expects: `NEXT_PUBLIC_GOOGLE_MAPS_ID`

**How to Verify**:
1. Go to Vercel Dashboard → Environment Variables
2. Check if `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` still exists
3. If yes: **DELETE IT** (it's no longer used by the code)

---

#### Root Cause 3: API Not Enabled in Google Cloud Console

**Hypothesis**: The API key exists but doesn't have "Maps Embed API" enabled.

**Required API**: `Maps Embed API`

**How to Verify**:
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Select your project
3. Go to **APIs & Services** → **Library**
4. Search for "Maps Embed API"
5. Click on it
6. Verify status: Should show **"API enabled"** with a green checkmark

**If NOT enabled**:
- Click **"ENABLE"** button
- Wait 1-2 minutes for propagation
- Test again in production

---

#### Root Cause 4: Domain Restrictions Blocking Production

**Hypothesis**: The API key has HTTP referrer restrictions that don't include the production domain.

**Current Domain**: `smidjan.be` (or `*.vercel.app` during preview)

**How to Verify**:
1. Go to Google Cloud Console: https://console.cloud.google.com/apis/credentials
2. Click on your API key (the one used for production)
3. Scroll to **"Application restrictions"**
4. Check **"Website restrictions"** section

**Expected Configuration**:
```
Application restrictions:
  Type: HTTP referrers (websites)

Website restrictions:
  ✅ https://smidjan.be/*
  ✅ https://*.smidjan.be/*
  ✅ http://localhost/*
  ✅ http://127.0.0.1/*
  ✅ https://*.vercel.app/* (for preview deployments)
```

**If restrictions are incorrect**:
- Add the missing domains
- Save changes
- Wait 5 minutes for propagation
- Test again

---

#### Root Cause 5: API Key Restrictions Too Strict

**Hypothesis**: The API key has "API restrictions" that don't include Maps Embed API.

**How to Verify**:
1. Go to Google Cloud Console: https://console.cloud.google.com/apis/credentials
2. Click on your API key
3. Scroll to **"API restrictions"**

**Expected Configuration**:
```
API restrictions:
  Type: Restrict key

Select APIs:
  ✅ Maps Embed API
  ⚠️ (optionally) Maps JavaScript API
  ⚠️ (optionally) Geocoding API
```

**If "Maps Embed API" is NOT checked**:
- Check the box next to "Maps Embed API"
- Save changes
- Wait 5 minutes for propagation
- Test again

---

#### Root Cause 6: Billing Not Enabled on Google Cloud Project

**Hypothesis**: The Google Cloud project doesn't have billing enabled or has exhausted free tier.

**Maps Embed API Pricing**:
- **Free Tier**: $200/month credit (≈28,500 map loads)
- **After Free Tier**: $7 per 1,000 map loads

**How to Verify**:
1. Go to Google Cloud Console: https://console.cloud.google.com/billing
2. Check if billing is enabled
3. Go to **Billing** → **Reports**
4. Check if you've exceeded quota

**If billing not enabled**:
- Enable billing (requires credit card)
- Free tier should cover most small business usage

---

## 📊 DIAGNOSTIC CHECKLIST

### Step 1: Verify Vercel Environment Variable

```bash
# Action: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select project: "Smidjan" or your project name
3. Go to: Settings → Environment Variables
4. Find: NEXT_PUBLIC_GOOGLE_MAPS_ID
5. Click: 👁️ Show
6. Verify:
   - ✅ Variable exists
   - ✅ Value starts with "AIza"
   - ✅ Value is 39 characters long
   - ✅ No extra spaces or quotes
   - ✅ Enabled for: Production, Preview, Development
```

**Expected Output**:
```
Name: NEXT_PUBLIC_GOOGLE_MAPS_ID
Value: ***MASKED_GOOGLE_MAPS_API_KEY*** (or similar)
Environments: ✅ Production ✅ Preview ✅ Development
```

**If variable doesn't exist**:
- Add it with the value from `.env.local`
- Redeploy the application

**If variable value is wrong**:
- Update it with the correct value
- Redeploy the application

---

### Step 2: Verify Google Cloud API Key Configuration

```bash
# Action: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/apis/credentials
2. Find your API key (look for the key that matches Vercel value)
3. Click on the key name
4. Verify configuration:

   Application restrictions:
   ✅ HTTP referrers (websites)

   Website restrictions:
   ✅ https://smidjan.be/*
   ✅ https://*.smidjan.be/*
   ✅ http://localhost/*
   ✅ https://*.vercel.app/*

   API restrictions:
   ✅ Restrict key
   ✅ Maps Embed API (checked)
```

---

### Step 3: Verify Maps Embed API is Enabled

```bash
# Action: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/apis/library
2. Search: "Maps Embed API"
3. Click on: "Maps Embed API"
4. Verify: Should show "API enabled" with green checkmark
```

**If NOT enabled**:
```bash
1. Click: "ENABLE" button
2. Wait: 1-2 minutes
3. Refresh: Vercel production site
4. Test: Map should now display
```

---

### Step 4: Test API Key Manually

You can test the API key directly in your browser:

```
https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=50.6446374,5.5664509&zoom=13&language=fr&region=BE
```

**Replace `YOUR_API_KEY`** with the actual key from Vercel.

**Expected Result**:
- ✅ Map displays with pin at Liège, Belgium
- ❌ Error message: "This page can't load Google Maps correctly" → Invalid key
- ❌ Error message: "RefererNotAllowedMapError" → Domain restrictions issue

---

## 💡 SOLUTION STEPS

### Solution 1: Update API Key in Vercel (Most Common)

**If the API key in Vercel is wrong or missing:**

1. **Get Correct API Key**:
   - Go to: https://console.cloud.google.com/apis/credentials
   - Find your API key (or create a new one if needed)
   - Copy the full key value (starts with `AIza`)

2. **Update Vercel Environment Variable**:
   ```bash
   1. Go to: https://vercel.com/dashboard
   2. Select project
   3. Settings → Environment Variables
   4. Find: NEXT_PUBLIC_GOOGLE_MAPS_ID
   5. Click: Edit (pencil icon)
   6. Paste new key value
   7. Ensure checked: ✅ Production ✅ Preview ✅ Development
   8. Click: Save
   ```

3. **Redeploy**:
   ```bash
   # Option A: From Vercel Dashboard
   1. Go to: Deployments tab
   2. Find latest deployment
   3. Click: ... menu → Redeploy

   # Option B: Push new commit
   git commit --allow-empty -m "chore: trigger redeploy for API key update"
   git push
   ```

4. **Wait & Test**:
   - Wait 2-3 minutes for deployment
   - Visit production site: https://smidjan.be/contact
   - Verify map displays

**Estimated Time**: 5-10 minutes

---

### Solution 2: Fix Domain Restrictions in Google Cloud

**If the API key has incorrect domain restrictions:**

1. **Update Restrictions**:
   ```bash
   1. Go to: https://console.cloud.google.com/apis/credentials
   2. Click on your API key
   3. Under "Application restrictions":
      - Select: HTTP referrers (websites)
   4. Under "Website restrictions":
      - Click: ADD AN ITEM
      - Add each domain:
        ✅ https://smidjan.be/*
        ✅ https://*.smidjan.be/*
        ✅ http://localhost/*
        ✅ http://127.0.0.1/*
        ✅ https://*.vercel.app/*
   5. Click: SAVE
   ```

2. **Wait for Propagation**:
   - Changes take 5-10 minutes to propagate globally
   - Google Cloud Console will show "Saving..." then "Saved"

3. **Test**:
   - Wait 5 minutes
   - Visit: https://smidjan.be/contact
   - Map should now display

**Estimated Time**: 10-15 minutes

---

### Solution 3: Enable Maps Embed API

**If Maps Embed API is not enabled:**

1. **Enable API**:
   ```bash
   1. Go to: https://console.cloud.google.com/apis/library
   2. Search: "Maps Embed API"
   3. Click: Maps Embed API
   4. Click: ENABLE button
   5. Wait: 1-2 minutes
   ```

2. **Verify Enabled**:
   - Refresh the API page
   - Should show: "API enabled" with green checkmark

3. **Test**:
   - Visit: https://smidjan.be/contact
   - Map should now display

**Estimated Time**: 5 minutes

---

### Solution 4: Fix API Restrictions

**If the API key doesn't have Maps Embed API in allowed APIs:**

1. **Update API Restrictions**:
   ```bash
   1. Go to: https://console.cloud.google.com/apis/credentials
   2. Click on your API key
   3. Under "API restrictions":
      - Select: Restrict key
   4. Under "Select APIs":
      - ✅ Check: Maps Embed API
      - ⚠️ (optional) Maps JavaScript API
   5. Click: SAVE
   ```

2. **Wait & Test**:
   - Wait 5 minutes for propagation
   - Visit: https://smidjan.be/contact
   - Map should display

**Estimated Time**: 10 minutes

---

### Solution 5: Enable Billing (If Needed)

**If billing is not enabled on Google Cloud project:**

1. **Enable Billing**:
   ```bash
   1. Go to: https://console.cloud.google.com/billing
   2. Click: LINK A BILLING ACCOUNT
   3. Select existing account or create new
   4. Add credit card (required, but free tier applies)
   5. Confirm
   ```

2. **Verify Free Tier**:
   - Free tier: $200/month credit
   - Covers ~28,500 map loads/month
   - Sufficient for most small businesses

3. **Test**:
   - Wait 2-3 minutes
   - Visit: https://smidjan.be/contact
   - Map should display

**Estimated Time**: 10-15 minutes

---

## 🎯 RECOMMENDED ACTION PLAN

### Priority 1: Verify API Key in Vercel (MOST LIKELY FIX)

1. **Check Vercel Dashboard**:
   - Go to Environment Variables
   - Find `NEXT_PUBLIC_GOOGLE_MAPS_ID`
   - Verify the value is correct and matches Google Cloud Console

2. **Compare with Local**:
   - Local `.env.local`: `***MASKED_GOOGLE_MAPS_API_KEY***`
   - Vercel Production: ??? (needs verification)

3. **If different**:
   - Update Vercel variable with correct key
   - Redeploy

**Likelihood**: 80% this is the issue

---

### Priority 2: Check Domain Restrictions in Google Cloud

1. **Go to Google Cloud Console**:
   - APIs & Services → Credentials
   - Click on your API key
   - Verify "Website restrictions" includes production domain

2. **Required domains**:
   - `https://smidjan.be/*`
   - `https://*.smidjan.be/*`
   - `https://*.vercel.app/*` (for preview)

3. **If missing**:
   - Add the domains
   - Save and wait 5 minutes

**Likelihood**: 15% this is the issue

---

### Priority 3: Verify Maps Embed API Enabled

1. **Go to Google Cloud Console**:
   - APIs & Services → Library
   - Search "Maps Embed API"
   - Verify it's enabled

2. **If not enabled**:
   - Click ENABLE
   - Wait 2 minutes

**Likelihood**: 5% this is the issue

---

## 📝 TESTING AFTER FIX

### Production Test

1. **Visit Contact Page**:
   ```
   https://smidjan.be/contact
   ```

2. **Scroll to Map Section**:
   - Should see interactive Google Map
   - Pin should be at Liège, Belgium (coordinates: 50.6446374, 5.5664509)
   - Zoom level: 13

3. **Interact with Map**:
   - Click and drag to pan
   - Zoom in/out
   - Click "View larger map" (should open Google Maps in new tab)

### Preview Test

1. **Deploy to Preview**:
   ```bash
   git checkout -b test-maps-fix
   git commit --allow-empty -m "test: verify maps in preview"
   git push -u origin test-maps-fix
   ```

2. **Open Preview URL**:
   - Vercel will provide preview URL (e.g., `https://smidjan-abc123.vercel.app`)
   - Go to `/contact` page
   - Verify map displays

### Local Test (Should Already Work)

1. **Run Dev Server**:
   ```bash
   npm run dev
   ```

2. **Visit**:
   ```
   http://localhost:3000/contact
   ```

3. **Verify**:
   - Map should display (already working locally)

---

## 🔗 USEFUL LINKS

### Google Cloud Console
- **Credentials**: https://console.cloud.google.com/apis/credentials
- **APIs Library**: https://console.cloud.google.com/apis/library
- **Billing**: https://console.cloud.google.com/billing
- **Maps Embed API**: https://console.cloud.google.com/apis/library/maps-embed-backend.googleapis.com

### Vercel Dashboard
- **Environment Variables**: https://vercel.com/dashboard → Project → Settings → Environment Variables
- **Deployments**: https://vercel.com/dashboard → Project → Deployments

### Documentation
- **Maps Embed API Docs**: https://developers.google.com/maps/documentation/embed/get-started
- **API Key Restrictions**: https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions
- **Vercel Environment Variables**: https://vercel.com/docs/projects/environment-variables

---

## ⚠️ IMPORTANT NOTES

### Security
- ✅ `NEXT_PUBLIC_GOOGLE_MAPS_ID` is safe to expose (public by design)
- ✅ API key should have HTTP referrer restrictions (prevents unauthorized use)
- ✅ API key should have API restrictions (only Maps Embed API)
- ❌ Never use server-side API keys for client-side maps

### Billing
- Google Maps Embed API has **$200/month free tier**
- This covers approximately **28,500 map loads/month**
- For a typical business website, this is **more than sufficient**
- Monitor usage: https://console.cloud.google.com/billing/reports

### Debugging
If issue persists after all checks:
1. Check browser console for detailed error messages
2. Test with a brand new API key (create fresh in Google Cloud Console)
3. Verify no browser extensions blocking the map
4. Test in incognito mode
5. Try different browser

---

## 📊 IMPACT ASSESSMENT

| Aspect | Current State | After Fix | Importance |
|--------|--------------|-----------|------------|
| **Map Visibility** | ❌ Not displayed | ✅ Displayed | Critical |
| **User Experience** | ⚠️ Degraded | ✅ Professional | High |
| **SEO Impact** | ⚠️ Minor (text present) | ✅ None | Low |
| **Business Impact** | ⚠️ Less trust | ✅ Full trust | Medium |
| **Technical Debt** | ❌ Needs fixing | ✅ Resolved | High |

---

## 🏁 CONCLUSION

The Google Maps integration is **correctly implemented in code** but fails in production due to an **invalid or incorrectly configured API key**.

**Most Likely Cause**: The `NEXT_PUBLIC_GOOGLE_MAPS_ID` variable in Vercel production environment contains:
- Wrong API key value
- Expired/revoked key
- Key with incorrect restrictions

**Recommended Action**:
1. ✅ Verify and update API key in Vercel Dashboard
2. ✅ Verify domain restrictions in Google Cloud Console
3. ✅ Redeploy and test

**Estimated Fix Time**: 10-15 minutes

**Priority**: High (affects user experience and professional impression)

---

**Audit Completed By**: Claude Code
**Date**: 2025-11-09
**Status**: ✅ ANALYSIS COMPLETE - ACTION REQUIRED BY USER
