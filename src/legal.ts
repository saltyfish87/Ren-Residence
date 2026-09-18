// Legal pages. Drafted to describe how this site actually operates (an independent agent's marketing page
// with a FormSubmit enquiry form, WhatsApp links and images hotlinked from Google Drive). Not a lawyer's
// work product; have it reviewed before it carries real commercial weight. Updated 2026-09-18.
export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { slug: 'terms' | 'privacy' | 'disclaimer'; title: string; intro: string; sections: LegalSection[] };

const AGENT = 'Yee Woei Shyan (REN 46305), IQI Realty Sdn Bhd E(1)1584';
const CONTACT = 'shyanyeews@gmail.com · WhatsApp +60 10-827 8932';

export const LEGAL: LegalDoc[] = [
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    intro: 'This site provides information about Ren Residence, Bukit Jalil, Kuala Lumpur. By using it you accept the terms below.',
    sections: [
        { h: 'Who operates this site', p: [`This site is operated by ${AGENT}, an independent registered real estate negotiator. It is not operated by, and is not an official publication of, Gaya Kuasa Sdn Bhd, GDP Architects or any other party involved in the development. Their names and marks appear only to identify the property being marketed and remain the property of their owners.`] },
        { h: 'An advertisement, not an offer', p: ['Nothing on this site is an offer, an invitation to treat or a contract of sale. Any purchase is governed solely by the Sale and Purchase Agreement and the developer\'s own documentation, which prevail over anything published here.'] },
        { h: 'Accuracy and changes', p: ['Information is drawn from materials issued by the developer and believed correct as at the date of this page. Unit availability, specifications, layouts, facilities, completion dates and pricing are set by the developer and the relevant authorities and may change without notice. Content may be corrected, updated or withdrawn at any time. Confirm any figure that matters to your decision before relying on it.'] },
        { h: 'Pricing', p: ['The starting price shown is a guide only. Current prices, packages and availability are provided on request and may change at any time.'] },
        { h: 'Enquiries', p: ['Submitting the registration form or messaging via WhatsApp does not reserve a unit or create any obligation on either side. How your details are handled is set out in the Privacy Policy.'] },
        { h: 'Intellectual property', p: ['Renders, plans, photographs and the Ren Residence name belong to the developer and its licensors and are reproduced for marketing this property only. You may view and print pages for your personal evaluation of the property; any other use requires the owner\'s permission.'] },
        { h: 'Third-party services', p: ['Some images are served from Google\'s servers, the enquiry form is delivered by FormSubmit, and messaging uses WhatsApp (Meta). Those services run under their own terms and privacy policies.'] },
        { h: 'Liability and governing law', p: ['The site is provided as is. To the extent permitted by law, no liability is accepted for loss arising from reliance on its content or from the site being unavailable. These terms are governed by the laws of Malaysia and the Malaysian courts have exclusive jurisdiction.'] },
        { h: 'Contact', p: [`${AGENT} · ${CONTACT}`] },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    intro: 'This policy explains what happens to personal data in connection with this site. It is written to Malaysia\'s Personal Data Protection Act 2010 (PDPA).',
    sections: [
        { h: 'Who is responsible', p: [`${AGENT} is responsible for personal data processed in connection with this site and can be reached at ${CONTACT}.`] },
        { h: 'What is collected', p: ['When you submit the registration form, the name, phone number, email address, preferred unit and message you enter are sent by email to the agent through FormSubmit. If you message via WhatsApp or email, whatever you choose to send is received there. The site itself sets no cookies, runs no analytics or advertising pixels, and does not build a profile of you.', 'Your language preference (EN / 中文) is remembered in your own browser only and never sent anywhere.'] },
        { h: 'Third-party requests', p: ['Images and floor plans are served from Google\'s servers; loading them discloses your IP address and browser details to Google under Google\'s privacy policy. The registration form is delivered by FormSubmit, and WhatsApp is operated by Meta; messages travel through their systems under their policies. Nothing is done with that data on our side.'] },
        { h: 'How your details are used', p: ['For one purpose: to answer your enquiry and follow up about Ren Residence. Details are not sold or passed to unrelated third parties. Where progressing an enquiry requires it, they may be shared with the developer or its appointed solicitors, and only to that extent.'] },
        { h: 'How long it is kept', p: ['Enquiry correspondence is kept for as long as needed to deal with your enquiry and to meet record-keeping obligations that apply to registered agents, then deleted. You may ask for earlier deletion.'] },
        { h: 'Your rights under the PDPA', p: [`You may ask what personal data is held about you, ask for it to be corrected, ask for it to be deleted, or withdraw consent to being contacted. Send requests to ${CONTACT}.`] },
        { h: 'Children and changes', p: ['This site is aimed at adults considering a property purchase. If data handling changes, this policy is updated before the change goes live.'] },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    intro: 'This site is a real estate advertisement for Ren Residence. Please read the following before relying on anything published here.',
    sections: [
        { h: 'An independent agent\'s site', p: [`Published by ${AGENT}. It is not the website of, and is not endorsed by, Gaya Kuasa Sdn Bhd, GDP Architects or any related party.`] },
        { h: 'Not a contract, not an offer', p: ['No description, figure, image or statement here forms part of any offer or contract. The Sale and Purchase Agreement and the developer\'s official documentation govern any purchase and prevail over this site in every respect.'] },
        { h: 'Not financial or investment advice', p: ['Nothing here is financial, investment, tax or legal advice, and nothing here is a projection or guarantee of rental income, occupancy, yield or capital appreciation. Property values can fall as well as rise. Take independent professional advice before committing.'] },
        { h: 'Images are illustrations', p: ['Renders, perspectives, floor plans, facility plans are artist\'s impressions supplied by the developer, provided for illustration only and not to scale. Finishes, furniture, landscaping and views shown may not be provided and may differ from the completed development.'] },
        { h: 'Figures are the developer\'s and can change', p: ['Floor levels, unit counts, built-up areas, layout types, facilities and the completion date are taken from the developer\'s materials and are subject to change by the developer and the relevant authorities, and to final survey. Built-up areas are subject to final measurement.'] },
        { h: 'Pricing and availability', p: ['The starting price shown is a guide. Prices are set and revised by the developer; current prices, packages and availability are provided on request.'] },
        { h: 'Third-party content', p: ['References to nearby landmarks, transport, malls, hotels, hospitals and schools are for orientation. Distances and travel times are indicative and not surveyed.'] },
        { h: 'Questions', p: [`If anything on this site looks wrong, corrections are welcome: ${CONTACT}.`] },
    ],
  },
];
