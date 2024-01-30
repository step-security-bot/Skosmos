/* global Vue */
/* global SKOSMOS */

const vocabSearch = Vue.createApp({
  data () {
    return {
      languages: [],
      selectedLanguage: null,
      searchTerm: null,
      autoCompeteResults: [ //static mockup to display results
      {
      "uri": "http://www.yso.fi/onto/yso/p19378",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p19378",
      "prefLabel": "kissa",
      "lang": "fi",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p864",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p864",
      "prefLabel": "kissaeläimet",
      "lang": "fi",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p18191",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p18191",
      "prefLabel": "kissamaki",
      "lang": "fi",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p17951",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p17951",
      "prefLabel": "kissanhuuto-oireyhtymä",
      "lang": "fi",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p29087",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p29087",
      "prefLabel": "kissankasvattajat",
      "lang": "fi",
      "hiddenLabel": "kissankasvattaja",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p29087",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p29087",
      "prefLabel": "kissankasvattajat",
      "lang": "fi",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p21153",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p21153",
      "prefLabel": "kissankello",
      "lang": "fi",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p29557",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p29557",
      "prefLabel": "kissankäpälälude",
      "lang": "fi",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p26343",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p26343",
      "prefLabel": "kissanäyttelyt",
      "lang": "fi",
      "hiddenLabel": "kissanäyttely",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p26343",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p26343",
      "prefLabel": "kissanäyttelyt",
      "lang": "fi",
      "vocab": "yso"
    },
    {
      "uri": "http://www.yso.fi/onto/yso/p19378",
      "type": [
        "skos:Concept",
        "http://www.yso.fi/onto/yso-meta/Concept"
      ],
      "localname": "p19378",
      "prefLabel": "kissa",
      "lang": "fi",
      "altLabel": "kissat",
      "vocab": "yso"
    } ],
      languageStrings: null
    }
  },
  mounted () {
    this.languages = SKOSMOS.languageOrder
    this.selectedLanguage = SKOSMOS.content_lang
    this.languageStrings = SKOSMOS.language_strings[SKOSMOS.lang]
  },
  methods: {
    autoComplete () {
    /* Take the input string
     *   - Once user has stopped typing aftes X ms, submit the search
     *   - Append an asterix after the search term
     *   - Display a waiting spinner?
     *   - Process the search results into autoCompeteResults
     *   - If the user writes more text in addition to previously given input (startswith), don't perform search, but filter the existing result list
     *   - When the result is done, display the dropdown
     *   - When user clears the text box or deletes the contents, hide the dropdown
     */
    
    },
    gotoSearchPage () {
      if (!this.searchTerm) return

      const currentVocab = SKOSMOS.vocab + '/' + SKOSMOS.lang + '/'
      const vocabHref = window.location.href.substring(0, window.location.href.lastIndexOf(SKOSMOS.vocab)) + currentVocab
      let langParam = '&clang=' + SKOSMOS.content_lang
      if (this.selectedLanguage === 'all') langParam += '&anylang=on'
      const searchUrl = vocabHref + 'search?q=' + this.searchTerm + langParam
      window.location.href = searchUrl
    },
    changeLang () {
      SKOSMOS.content_lang = this.selectedLanguage
      // TODO: Impelement partial page load to change content according to the new content language
    }
  },
  template: `
    <div class="d-flex mb-2 my-auto ms-auto">
      <div class="input-group" id="search-wrapper">
        <select class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown-item" aria-expanded="false"
          v-model="selectedLanguage"
          @change="changeLang()"
        >
          <option class="dropdown-item" v-for="(value, key) in languageStrings" :value="key">{{ value }}</option>
        </select>
        <input type="search" class="form-control" aria-label="Text input with dropdown button" placeholder="Search..."
          v-model="searchTerm"
          @input="autoComplete()"
          @keyup.enter="gotoSearchPage()"
        >
        <button id="clear-button" class="btn btn-danger" type="clear" v-if="searchTerm" @click="searchTerm = ''">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <button id="search-button" class="btn btn-outline-secondary" @click="gotoSearchPage()">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  `
})

vocabSearch.mount('#search-vocab')
