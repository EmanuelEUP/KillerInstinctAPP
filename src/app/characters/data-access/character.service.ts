import { collectionData, TaskState, collection } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { authState } from '@angular/fire/auth';

export interface Character {
  id: string;
  name: string;
  description: string;
}

export type CharacterCreate = Omit<Character, 'id'>;
const basepath: string = 'characters';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor() {}

  firestore = inject(Firestore);
  authState = inject(authState);

  _collection = collection(this.firestore, basepath);

  getCharacters = toSignal(
    collectionData(this._collection, { idField: 'id' }) as Observable<
      Character[]
    >,
    { initialValue: [] }
  );

  getCharacterbyID(id: string) {
    const docRef = doc(this.firestore, id);
    return getDoc(docRef);
  }

  crear(_character: CharacterCreate) {
    return addDoc(this._collection, {
      _character,
    });
  }

  update(ObjCharacter: CharacterCreate, id: string) {
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, ObjCharacter);
  }

  delete(objCharacater: CharacterCreate, id: string) {
    const ref = doc(this._collection, id);
    return;
  }
}
