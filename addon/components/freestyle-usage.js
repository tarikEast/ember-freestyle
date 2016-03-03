import Ember from 'ember';
import layout from '../templates/components/freestyle-usage';

const { computed, inject } = Ember;

let FreestyleUsage = Ember.Component.extend({
  layout,
  classNames: ['FreestyleUsage'],
  classNameBindings: ['inline:FreestyleUsage--inline'],
  emberFreestyle: inject.service(),
  showLabels: computed.alias('emberFreestyle.showLabels'),
  showNotes: computed.alias('emberFreestyle.showNotes'),
  showCode: computed.alias('emberFreestyle.showCode'),
  showUsage: computed('emberFreestyle.focus', 'slug', function() {
    let slug = this.get('slug');
    let focus = this.get('emberFreestyle.focus');
    if (focus && slug) {
      return slug.match(focus);
    }
    return true;
  }),
  snippetHbs: computed('slug', function() {
    return `${this.get('slug')}.hbs`;
  }),
  snippetJs: computed('slug', function() {
    return `${this.get('slug')}.js`;
  }),
  snippetScss: computed('slug', function() {
    return `${this.get('slug')}.scss`;
  }),
  snippetNotesJs: computed('slug', function() {
    return `${this.get('slug')}:notes.js`;
  }),
  snippetNotesHbs: computed('slug', function() {
    return `${this.get('slug')}:notes.hbs`;
  }),
  defaultTheme: computed.alias('emberFreestyle.defaultTheme'),
  // highlightJsTheme - passed in
  computedTheme: computed('defaultTheme', 'highlightJsTheme', function() {
    return this.get('highlightJsTheme') || this.get('defaultTheme');
  }),

  actions: {
    setFocus() {
      this.set('emberFreestyle.focus', this.get('slug'));
    }
  }
});

FreestyleUsage.reopenClass({
  positionalParams: ['slug']
});

export default FreestyleUsage;
