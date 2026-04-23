import os
import glob

files = glob.glob('*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(
        '<p>📍 Jl. Gayung Kebonsari Timur B. 36, Surabaya, Jawa Timur</p>',
        '<p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Jl. Gayung Kebonsari Timur B. 36, Surabaya</p>'
    )
    content = content.replace(
        '<p>📍 Jl. Gayung Kebonsari Timur B. 36, Surabaya</p>',
        '<p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Jl. Gayung Kebonsari Timur B. 36, Surabaya</p>'
    )
    content = content.replace(
        '<p>📧 info@strativo-bsm.com</p>',
        '<p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> info@strativo-bsm.com</p>'
    )
    content = content.replace(
        '<p>📱 0821 2419 8198</p>',
        '<p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> 0821 2419 8198</p>'
    )
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
