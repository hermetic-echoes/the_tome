(() => {
	class StringType {
		static __display = Symbol();
		static __keyboard_friendly = Symbol();
	}

	class Music {
		static NoteModifier = class NoteModifier {
			static __b = Symbol();
			static __n = Symbol();
			static __s = Symbol();

			static as_string(variant, type = StringType.__display) {
				switch (type) {
					case StringType.__display:
						return Music.NoteModifier.#as_display_string(variant);
					case StringType.__keyboard_friendly:
						return Music.NoteModifier.#as_keyboard_friendly_string(variant);
				}
			}

			static #as_display_string(variant) {
				switch (variant) {
					case Music.NoteModifier.__b:
						return '♭';
					case Music.NoteModifier.__n:
						return '♮';
					case Music.NoteModifier.__s:
						return '♯';
				}
			}

			static #as_keyboard_friendly_string(variant) {
				switch (variant) {
					case Music.NoteModifier.__b:
						return 'b';
					case Music.NoteModifier.__n:
						return '';
					case Music.NoteModifier.__s:
						return 's';
				}
			}

			static from_int(value) {
				if (value < 0) {
					return Music.NoteModifier.__b;
				} else if (value == 0) {
					return Music.NoteModifier.__n;
				} else {
					return Music.NoteModifier.__s;
				}
			}

			static to_int(variant) {
				switch (variant) {
					case Music.NoteModifier.__b:
						return -1;
					case Music.NoteModifier.__n:
						return 0;
					case Music.NoteModifier.__s:
						return 1;
				}
			}
		};

		static NoteLetter = class NoteLetter {
			static __c = Symbol();
			static __d = Symbol();
			static __e = Symbol();
			static __f = Symbol();
			static __g = Symbol();
			static __a = Symbol();
			static __b = Symbol();

			static as_string(variant, type = StringType.__display) {
				switch (type) {
					case StringType.__display:
						return Music.NoteLetter.#as_display_string(variant);
					case StringType.__keyboard_friendly:
						return Music.NoteLetter.#as_keyboard_friendly_string(variant);
				}
			}

			static #as_display_string(variant) {
				switch (variant) {
					case Music.NoteLetter.__c:
						return 'C';
					case Music.NoteLetter.__d:
						return 'D';
					case Music.NoteLetter.__e:
						return 'E';
					case Music.NoteLetter.__f:
						return 'F';
					case Music.NoteLetter.__g:
						return 'G';
					case Music.NoteLetter.__a:
						return 'A';
					case Music.NoteLetter.__b:
						return 'B';
				}
			}

			static #as_keyboard_friendly_string(variant) {
				switch (variant) {
					case Music.NoteLetter.__c:
						return 'c';
					case Music.NoteLetter.__d:
						return 'd';
					case Music.NoteLetter.__e:
						return 'e';
					case Music.NoteLetter.__f:
						return 'f';
					case Music.NoteLetter.__g:
						return 'g';
					case Music.NoteLetter.__a:
						return 'a';
					case Music.NoteLetter.__b:
						return 'b';
				}
			}
		};

		static Note = class Note {
			#letter;
			#modifier;

			constructor(letter, modifier) {
				this.#letter = letter;
				this.#modifier = modifier;
			}

			as_string(type) {
				return `${this.#letter__as_string(type)}${this.#modifier__as_string(type)}`;
			}

			#modifier__as_string(type) {
				let as_string = '';
				
				const modifier = Music.NoteModifier.from_int(this.#modifier);

				switch (modifier) {
					case Music.NoteModifier.__b:
						for (let i = this.#modifier; i < 0; i++) {
							as_string += Music.NoteModifier.as_string(modifier, type);
						}
						break;
					case Music.NoteModifier.__n:
						as_string = Music.NoteModifier.as_string(modifier, type);
						break;
					case Music.NoteModifier.__s:
						let as_string = '';
						for (let i = 1; i <= this.modifier; i++) {
							as_string += Music.NoteModifier.as_string(modifier, type);
						}
						break;
				}

				return as_string;
			}

			#letter__as_string(type) {
				return Music.NoteLetter.as_string(this.#letter, type);
			}

			new__diatonic_root(letter, modifier) {
				return new Music.Note(letter, Music.NoteModifier.to_int(modifier));
			}
		};
	}
})();
