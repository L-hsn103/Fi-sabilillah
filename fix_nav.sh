#!/bin/bash

# Desktop nav links for index.html (root context)
ROOT_DESKTOP='<a href="index.html" class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition" data-i18n="nav_home">Home</a>
      <div class="relative group">
        <button class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
          <span data-i18n="nav_about">About Us</span>
          <svg class="w-3 h-3 ml-1 text-slate-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute hidden top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50" aria-label="About Us submenu">
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_who_we_are">Who We Are</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_vision_mission">Vision & Mission</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_core_values">Core Values</button>
        </div>
      </div>
      <a href="pages/programs.html" class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition" data-i18n="nav_programs">Our Programs</a>
      <div class="relative group">
        <button class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
          <span data-i18n="nav_governance">Governance</span>
          <svg class="w-3 h-3 ml-1 text-slate-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute hidden top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50" aria-label="Governance submenu">
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_org_structure">Organizational Structure</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_exec_council">Executive Council</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_membership">Membership</button>
        </div>
      </div>
      <div class="relative group">
        <button class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
          <span data-i18n="nav_resources">Resources</span>
          <svg class="w-3 h-3 ml-1 text-slate-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute hidden top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50" aria-label="Resources submenu">
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_constitution">Constitution</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_transparency">Transparency</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_activities">Activities & Updates</button>
        </div>
      </div>
      <a href="pages/contact.html" class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition" data-i18n="nav_contact">Contact</a>'

# Desktop nav links for pages/ subdirectory context
PAGES_DESKTOP='<a href="../index.html" class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition" data-i18n="nav_home">Home</a>
      <div class="relative group">
        <button class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
          <span data-i18n="nav_about">About Us</span>
          <svg class="w-3 h-3 ml-1 text-slate-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute hidden top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50" aria-label="About Us submenu">
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_who_we_are">Who We Are</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_vision_mission">Vision & Mission</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_core_values">Core Values</button>
        </div>
      </div>
      <a href="programs.html" class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition" data-i18n="nav_programs">Our Programs</a>
      <div class="relative group">
        <button class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
          <span data-i18n="nav_governance">Governance</span>
          <svg class="w-3 h-3 ml-1 text-slate-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute hidden top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50" aria-label="Governance submenu">
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_org_structure">Organizational Structure</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_exec_council">Executive Council</button>
          <button class="dropdown-item w-full px-4 py-2 text-xs text-left text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition" data-i18n="nav_membership">Membership</button>
        </div>
      </div>
      <div class="relative group">
        <button class="nav-link px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-white/60 transition flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
          <span data-i18n="nav_resources">Resources</span>
          <svg class="w-3 h-3 ml-1 text-slate-400
