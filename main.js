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

			get letter() {
				return this.#letter;
			}

			get modifier() {
				return this.#modifier;
			}

			as_string(type = StringType.__display) {
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
				}

				return as_string;
			}

			#letter__as_string(type) {
				return Music.NoteLetter.as_string(this.#letter, type);
			}

			new__diatonic_root(letter, modifier) {
				return new Music.Note(letter, Music.NoteModifier.to_int(modifier));
			}

			new__scale_degree_of(scale_degree) {
				switch (scale_degree) {
					case Music.ScaleDegree.__1:
						return this.#new__1_of();
					case Music.ScaleDegree.__2b:
						return this.#new__2b_of();
					case Music.ScaleDegree.__2:
						return this.#new__2_of();
					case Music.ScaleDegree.__3b:
						return this.#new__3b_of();
					case Music.ScaleDegree.__3:
						return this.#new__3_of();
					case Music.ScaleDegree.__4:
						return this.#new__4_of();
					case Music.ScaleDegree.__4s:
						return this.#new__4s_of();
					case Music.ScaleDegree.__5b:
						return this.#new__5b_of();
					case Music.ScaleDegree.__5:
						return this.#new__5_of();
					case Music.ScaleDegree.__5s:
						return this.#new__5s_of();
					case Music.ScaleDegree.__6b:
						return this.#new__6b_of();
					case Music.ScaleDegree.__6:
						return this.#new__6_of();
					case Music.ScaleDegree.__7b:
						return this.#new__7b_of();
					case Music.ScaleDegree.__7:
						return this.#new__7_of();
					case Music.ScaleDegree.__8:
						return this.#new__8_of();
					case Music.ScaleDegree.__9b:
						return this.#new__9b_of();
					case Music.ScaleDegree.__9:
						return this.#new__9_of();
					case Music.ScaleDegree.__9s:
						return this.#new__9s_of();
					case Music.ScaleDegree.__11:
						return this.#new__11_of();
					case Music.ScaleDegree.__11s:
						return this.#new__11s_of();
					case Music.ScaleDegree.__13b:
						return this.#new__13b_of();
					case Music.ScaleDegree.__13:
						return this.#new__13_of();
				}
			}

			#new__1_of() {
				return new Music.Note(this.letter, this.modifier);
			}

			#new__2b_of() {
				const interim = this.#new__2_of();

				return new Music.Note(interim.letter, interim.modifier - 1);
			}

			#new__2_of() {
				let letter;
				let modifier;

				switch (this.letter) {
					case Music.NoteLetter.__c:
						letter = Music.NoteLetter.__d;
					case Music.NoteLetter.__d:
						letter = Music.NoteLetter.__e;
					case Music.NoteLetter.__e:
						letter = Music.NoteLetter.__f;
					case Music.NoteLetter.__f:
						letter = Music.NoteLetter.__g;
					case Music.NoteLetter.__g:
						letter = Music.NoteLetter.__a;
					case Music.NoteLetter.__a:
						letter = Music.NoteLetter.__b;
					case Music.NoteLetter.__b:
						letter = Music.NoteLetter.__c;
				}

				switch (this.letter) {
					case Music.NoteLetter.__e:
					case Music.NoteLetter.__b:
						modifier = this.modifier + 1;
						break;
					default:
						modifier = this.modifier;
				}

				return new Music.Note(letter, modifier);
			}

			#new__3b_of() {
				const interim = this.#new__3_of();
				
				return new Music.Note(interim.letter, interim.modifier - 1);
			}

			#new__3_of() {
				let letter;
				let modifier;

				switch (this.letter) {
					case Music.NoteLetter.__c:
						letter = Music.NoteLetter.__e;
					case Music.NoteLetter.__d:
						letter = Music.NoteLetter.__f;
					case Music.NoteLetter.__e:
						letter = Music.NoteLetter.__g;
					case Music.NoteLetter.__f:
						letter = Music.NoteLetter.__a;
					case Music.NoteLetter.__g:
						letter = Music.NoteLetter.__b;
					case Music.NoteLetter.__a:
						letter = Music.NoteLetter.__c;
					case Music.NoteLetter.__b:
						letter = Music.NoteLetter.__d;
				}

				switch (this.letter) {
					case Music.NoteLetter.__d:
					case Music.NoteLetter.__e:
					case Music.NoteLetter.__a:
					case Music.NoteLetter.__b:
						modifier = this.modifier + 1;
						break;
					default:
						modifier = this.modifier;
				}

				return new Music.Note(letter, modifier);
			}

			#new__4_of() {
				let letter;
				let modifier;

				switch (this.letter) {
					case Music.NoteLetter.__c:
						letter = Music.NoteLetter.__f;
					case Music.NoteLetter.__d:
						letter = Music.NoteLetter.__g;
					case Music.NoteLetter.__e:
						letter = Music.NoteLetter.__a;
					case Music.NoteLetter.__f:
						letter = Music.NoteLetter.__b;
					case Music.NoteLetter.__g:
						letter = Music.NoteLetter.__c;
					case Music.NoteLetter.__a:
						letter = Music.NoteLetter.__d;
					case Music.NoteLetter.__b:
						letter = Music.NoteLetter.__e;
				}

				switch (this.letter) {
					case Music.NoteLetter.__f:
						modifier = this.modifier - 1;
						break;
					default:
						modifier = this.modifier;
				}

				return new Music.Note(letter, modifier);
			}

			#new__4s_of() {
				const interim = this.#new__4_of();
				
				return new Music.Note(interim.letter, interim.modifier + 1);
			}

			#new__5b_of() {
				const interim = this.#new__5_of();
				
				return new Music.Note(interim.letter, interim.modifier - 1);
			}

			#new__5_of() {
				let letter;
				let modifier;

				switch (this.letter) {
					case Music.NoteLetter.__c:
						letter = Music.NoteLetter.__g;
					case Music.NoteLetter.__d:
						letter = Music.NoteLetter.__a;
					case Music.NoteLetter.__e:
						letter = Music.NoteLetter.__b;
					case Music.NoteLetter.__f:
						letter = Music.NoteLetter.__c;
					case Music.NoteLetter.__g:
						letter = Music.NoteLetter.__d;
					case Music.NoteLetter.__a:
						letter = Music.NoteLetter.__e;
					case Music.NoteLetter.__b:
						letter = Music.NoteLetter.__f;
				}

				switch (this.letter) {
					case Music.NoteLetter.__b:
						modifier = this.modifier + 1;
						break;
					default:
						modifier = this.modifier;
				}

				return new Music.Note(letter, modifier);
			}

			#new__5s_of() {
				const interim = this.#new__5_of();
				
				return new Music.Note(interim.letter, interim.modifier + 1);
			}

			#new__6b_of() {
				const interim = this.#new__6_of();
				
				return new Music.Note(interim.letter, interim.modifier - 1);
			}

			#new__6_of() {
				let letter;
				let modifier;

				switch (this.letter) {
					case Music.NoteLetter.__c:
						letter = Music.NoteLetter.__a;
					case Music.NoteLetter.__d:
						letter = Music.NoteLetter.__b;
					case Music.NoteLetter.__e:
						letter = Music.NoteLetter.__c;
					case Music.NoteLetter.__f:
						letter = Music.NoteLetter.__d;
					case Music.NoteLetter.__g:
						letter = Music.NoteLetter.__e;
					case Music.NoteLetter.__a:
						letter = Music.NoteLetter.__f;
					case Music.NoteLetter.__b:
						letter = Music.NoteLetter.__g;
				}

				switch (this.letter) {
					case Music.NoteLetter.__e:
					case Music.NoteLetter.__a:
					case Music.NoteLetter.__b:
						modifier = this.modifier + 1;
						break;
					default:
						modifier = this.modifier;
				}

				return new Music.Note(letter, modifier);
			}

			#new__7b_of() {
				const interim = this.#new__7_of();
				
				return new Music.Note(interim.letter, interim.modifier - 1);
			}

			#new__7_of() {
				let letter;
				let modifier;

				switch (this.letter) {
					case Music.NoteLetter.__c:
						letter = Music.NoteLetter.__b;
					case Music.NoteLetter.__d:
						letter = Music.NoteLetter.__c;
					case Music.NoteLetter.__e:
						letter = Music.NoteLetter.__d;
					case Music.NoteLetter.__f:
						letter = Music.NoteLetter.__e;
					case Music.NoteLetter.__g:
						letter = Music.NoteLetter.__f;
					case Music.NoteLetter.__a:
						letter = Music.NoteLetter.__g;
					case Music.NoteLetter.__b:
						letter = Music.NoteLetter.__a;
				}

				switch (this.letter) {
					case Music.NoteLetter.__e:
					case Music.NoteLetter.__g:
					case Music.NoteLetter.__a:
					case Music.NoteLetter.__b:
						modifier = this.modifier + 1;
						break;
					default:
						modifier = this.modifier;
				}

				return new Music.Note(letter, modifier);
			}

			#new__8_of() {
				return this.#new__1_of();
			}

			#new__9b_of() {
				const interim = this.#new__9_of();
				
				return new Music.Note(interim.letter, interim.modifier - 1);
			}

			#new__9_of() {
				return this.#new__2_of();
			}

			#new__9s_of() {
				const interim = this.#new__9_of();
				
				return new Music.Note(interim.letter, interim.modifier + 1);
			}

			#new__11_of() {
				return this.#new__4_of();
			}

			#new__11s_of() {
				const interim = this.#new__11_of();
				
				return new Music.Note(interim.letter, interim.modifier + 1);
			}

			#new__13b_of() {
				const interim = this.#new__13_of();
				
				return new Music.Note(interim.letter, interim.modifier - 1);
			}

			#new__13_of() {
				return this.#new__6_of();
			}
		};

		static ScaleDegree = class ScaleDegree {
			static __1 = Symbol();
			static __2b = Symbol();
			static __2 = Symbol();
			static __3b = Symbol();
			static __3 = Symbol();
			static __4 = Symbol();
			static __4s = Symbol();
			static __5b = Symbol();
			static __5 = Symbol();
			static __5s = Symbol();
			static __6b = Symbol();
			static __6 = Symbol();
			static __7b = Symbol();
			static __7 = Symbol();
			static __8 = Symbol();
			static __9b = Symbol();
			static __9 = Symbol();
			static __9s = Symbol();
			static __11 = Symbol();
			static __11s = Symbol();
			static __13b = Symbol();
			static __13 = Symbol();

			static as_string(variant, type = StringType.__display) {
				switch (type) {
					case StringType.__display:
						return Music.ScaleDegree.#as_display_string(variant);
					case StringType.__keyboard_friendly:
						return Music.ScaleDegree.#as_keyboard_friendly_string(variant);
				}
			}

			static #as_display_string(variant) {
				switch (variant) {
					case Music.ScaleDegree.__1:
						return '1';
					case Music.ScaleDegree.__2b:
						return `2${Music.NoteModifier.as_string(Music.NoteModifier.__b)}`;
					case Music.ScaleDegree.__2:
						return '2';
					case Music.ScaleDegree.__3b:
						return `3${Music.NoteModifier.as_string(Music.NoteModifier.__b)}`;
					case Music.ScaleDegree.__3:
						return '3';
					case Music.ScaleDegree.__4:
						return '4';
					case Music.ScaleDegree.__4s:
						return `4${Music.NoteModifier.as_string(Music.NoteModifier.__s)}`;
					case Music.ScaleDegree.__5b:
						return `5${Music.NoteModifier.as_string(Music.NoteModifier.__b)}`;
					case Music.ScaleDegree.__5:
						return '5';
					case Music.ScaleDegree.__5s:
						return `5${Music.NoteModifier.as_string(Music.NoteModifier.__s)}`;
					case Music.ScaleDegree.__6b:
						return `6${Music.NoteModifier.as_string(Music.NoteModifier.__b)}`;
					case Music.ScaleDegree.__6:
						return '6';
					case Music.ScaleDegree.__7b:
						return `7${Music.NoteModifier.as_string(Music.NoteModifier.__b)}`;
					case Music.ScaleDegree.__7:
						return '7';
					case Music.ScaleDegree.__8:
						return '8';
					case Music.ScaleDegree.__9b:
						return `9${Music.NoteModifier.as_string(Music.NoteModifier.__b)}`;
					case Music.ScaleDegree.__9:
						return '9';
					case Music.ScaleDegree.__9s:
						return `9${Music.NoteModifier.as_string(Music.NoteModifier.__s)}`;
					case Music.ScaleDegree.__11:
						return '11';
					case Music.ScaleDegree.__11s:
						return `11${Music.NoteModifier.as_string(Music.NoteModifier.__s)}`;
					case Music.ScaleDegree.__13b:
						return `13${Music.NoteModifier.as_string(Music.NoteModifier.__b)}`;
					case Music.ScaleDegree.__13:
						return '13';
				}
			}

			static #as_keyboard_friendly_string(variant) {
				switch (variant) {
					case Music.ScaleDegree.__1:
						return '1';
					case Music.ScaleDegree.__2b:
						return `2${Music.NoteModifier.as_string(Music.NoteModifier.__b, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__2:
						return '2';
					case Music.ScaleDegree.__3b:
						return `3${Music.NoteModifier.as_string(Music.NoteModifier.__b, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__3:
						return '3';
					case Music.ScaleDegree.__4:
						return '4';
					case Music.ScaleDegree.__4s:
						return `4${Music.NoteModifier.as_string(Music.NoteModifier.__s, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__5b:
						return `5${Music.NoteModifier.as_string(Music.NoteModifier.__b, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__5:
						return '5';
					case Music.ScaleDegree.__5s:
						return `5${Music.NoteModifier.as_string(Music.NoteModifier.__s, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__6b:
						return `6${Music.NoteModifier.as_string(Music.NoteModifier.__b, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__6:
						return '6';
					case Music.ScaleDegree.__7b:
						return `7${Music.NoteModifier.as_string(Music.NoteModifier.__b, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__7:
						return '7';
					case Music.ScaleDegree.__8:
						return '8';
					case Music.ScaleDegree.__9b:
						return `9${Music.NoteModifier.as_string(Music.NoteModifier.__b, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__9:
						return '9';
					case Music.ScaleDegree.__9s:
						return `9${Music.NoteModifier.as_string(Music.NoteModifier.__s, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__11:
						return '11';
					case Music.ScaleDegree.__11s:
						return `11${Music.NoteModifier.as_string(Music.NoteModifier.__s, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__13b:
						return `13${Music.NoteModifier.as_string(Music.NoteModifier.__b, StringType.__keyboard_friendly)}`;
					case Music.ScaleDegree.__13:
						return '13';
				}
			}
		};
	}
})();
