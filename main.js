(() => {
	class Music {
		static NoteModifier = class NoteModifier {
			static __b = Symbol();
			static __n = Symbol();
			static __s = Symbol();

			static as_display_string(variant) {
				switch (variant) {
					case Music.NoteModifier.__b:
						return '♭';
					case Music.NoteModifier.__n:
						return '♮';
					case Music.NoteModifier.__s:
						return '♯';
				}
			}

			static as_keyboard_friendly_string(variant) {
				switch (variant) {
					case Music.NoteModifier.__b:
						return 'b';
					case Music.NoteModifier.__n:
						return '';
					case Music.NoteModifier.__s:
						return 's';
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

			static as_display_string(variant) {
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

			static as_keyboard_friendly_string(variant) {
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
	}
})();
