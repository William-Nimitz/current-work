./src/app/services/conversation.service.ts //4138
import { Injectable } from '@angular/core';
import { Conversation } from '../classes/conversation';
import { Language } from '../classes/language';
import { Voice } from '../classes/voice';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConvFlowPack } from '../interfaces/convflow-models';
import { ConversationVersion } from '../classes/conversation-version';
import { map } from 'rxjs/operators';
import { UrlResponse } from '../interfaces/url-response';
import { ServerState } from '../classes/server-state';
import { PreviewResponse } from '../interfaces/preview-response';
import { FormatSettings } from '../classes/format-settings';

@Injectable({
providedIn: 'root'
})
export class ConversationService {

private baseUrl = environment.apiUrl + '/conversation';
public hasSettingsUpdate = false;

private currentFlowPack: ConvFlowPack;
private currentConversation: Conversation;
private currentVersion: ConversationVersion;

private advancedSettingsSubject = new BehaviorSubject<any>({});

constructor(private http: HttpClient) { }

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json return currently set conversation
e2e/ shell/ src/
getCurrentConversation(): Conversation {
return this.currentConversation;
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Set conversation to current
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param conversation Conversation
e2e/ shell/ src/
setCurrentConversation(conversation: Conversation): void {
this.currentConversation = conversation;
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json return latest version of conversation
e2e/ shell/ src/
getLatestVersion(): ConversationVersion {
return this.currentVersion;
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Set latest version of current conversation
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param version ConversationVersion
e2e/ shell/ src/
setLatestVersion(version: ConversationVersion): void {
this.currentVersion = version;
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json return packed conversation flow
e2e/ shell/ src/
getCurrentFlowPack(): ConvFlowPack {
return this.currentVersion.representationModel;
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Set packed conversation flow to current
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param flowPack ConvFlowPack
e2e/ shell/ src/
setCurrentFlowPack(flowPack: ConvFlowPack): void {
this.currentFlowPack = flowPack;
}

reset(): void {
this.currentConversation = null;
this.currentFlowPack = null;
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Return a the list of all conversations
e2e/ shell/ src/
getAllConversations(): Observable<Conversation[]> {
return this.http.get<Conversation[]>(this.baseUrl);
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Return a the list of all conversations
e2e/ shell/ src/
getAllUnlinkedConversations(): Observable<Conversation[]> {
return this.http.post<Conversation[]>(this.baseUrl + '/unlinked', {});
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json return conversation by requested ID
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param conversationId number
e2e/ shell/ src/
getConversationById(conversationId: number): Observable<Conversation> {
return this.http.get<Conversation>(this.baseUrl + `/${conversationId}`)
.pipe(map(conversation => {
this.setCurrentConversation(conversation);
return conversation;
}));
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json return latest flow version of current conversation
e2e/ shell/ src/
getLatestVersionOfConversation(): Observable<ConversationVersion> {
return this.http.get<ConversationVersion>(this.baseUrl + `/${this.currentConversation.id}/version/latest`)
.pipe(map(version => {
this.setLatestVersion(version);
return version;
}));
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json return all flow versions of current conversation
e2e/ shell/ src/
getAllVersionsOfConversation(): Observable<ConversationVersion[]> {
return this.http.get<ConversationVersion[]>(this.baseUrl + `/${this.currentConversation.id}/version`);
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json return one flow version of current conversation by version id
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param versionId number
e2e/ shell/ src/
getOneVersionByVersionId(versionId: number): Observable<ConversationVersion> {
return this.http.get<ConversationVersion>(this.baseUrl + `/${this.currentConversation.id}/version/${versionId}`);
}

getPendingConversationErrors(conversationId: number, conversationVersionId: number): Observable<any> {
return this.http.get<any>(this.baseUrl + `/${conversationId}/version/${conversationVersionId}/error`);
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Create the base object of a conversation
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param data any
e2e/ shell/ src/
createConversation(data: any): Observable<Conversation> {
return this.http.post<Conversation>(this.baseUrl + '/create', data);
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Save the current conversation flow by creating a new version
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param id number
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param conversation ConvFlowPack
e2e/ shell/ src/
createConversationVersion(conversationId: number, conversation: ConvFlowPack, voice: string = ''): Observable<ConversationVersion> {
// this.setLatestVersion(new ConversationVersion({representationModel : conversation, voiceId: voice}));
return this.http.post<ConversationVersion>(this.baseUrl + `/${conversationId}/version/create`,
new ConversationVersion({representationModel : conversation, voiceId: voice}))
.pipe(map(response => {
this.setLatestVersion(response);
return response;
}));
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Save the current conversation flow by creating a new version
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param id number
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param conversation ConvFlowPack
e2e/ shell/ src/
saveConversation(conversationId: number, conversation: ConvFlowPack, voice: string = ''): Observable<ConversationVersion> {
// this.setLatestVersion(new ConversationVersion({representationModel : conversation, voiceId: voice}));
return this.http.post<ConversationVersion>(this.baseUrl + `/${conversationId}/version/update`,
new ConversationVersion({
id: this.getLatestVersion().id,
representationModel : conversation,
voiceId: voice
}))
.pipe(map(response => {
this.setLatestVersion(response);
return response;
}));
}

previewConversation(conversationId: number, versionId: number): Observable<PreviewResponse> {
return this.http.post<PreviewResponse>(this.baseUrl + `/${conversationId}/version/${versionId}/preview`, {});
}

publishConversation(conversationId: number, versionId: number): Observable<ServerState> {
return this.http.post<ServerState>(this.baseUrl + `/${conversationId}/version/${versionId}/production`, {});
}

createConversationVersion(conversationId: number, conversation: ConvFlowPack, voice: string = ''): Observable<ConversationVersion> {
// this.setLatestVersion(new ConversationVersion({representationModel : conversation, voiceId: voice}));
return this.http.post<ConversationVersion>(this.baseUrl + `/${conversationId}/version/create`,
new ConversationVersion({representationModel : conversation, voiceId: voice}))
.pipe(map(response => {
this.setLatestVersion(response);
return response;
}));
}
/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json RELATED SERVICES
e2e/ shell/ src/

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Get All languages available
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param appType string
e2e/ shell/ src/
getAvailableLanguage(appType: string): Observable<Language[]> {
return this.http.post<Language[]>(this.baseUrl + '/language/available', {applicationType: appType});
// return this.http.post<Language[]>(this.baseUrl + '/language/available', {applicationType: appType});
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Get all voices for a selected language code and application type
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param appType string
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param code string
e2e/ shell/ src/
getVoicesByLanguageCode(appType: string, code: string): Observable<Voice[]> {
return this.http.post<Voice[]>(this.baseUrl + '/voice/available', {applicationType: appType, languageCode: code});
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Get an audio voice sample. `data` contains languageCode, VoiceId and sentence to be read.
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param data any
e2e/ shell/ src/
getVoiceSample(data: any): Observable<string> {
return this.http.post<UrlResponse>(environment.apiUrl + '/sampleaudio', data)
.pipe(map( response => {
return response.url;
}));
}

public getSettings(): any {
return this.advancedSettingsSubject.value;
}

setSettings(settings: any): void {
this.advancedSettingsSubject.next(settings);
this.hasSettingsUpdate = true;
}

getSettingsFromServer(conversationId: number, versionId: number): Observable<any> {
return this.http.get<any>(this.baseUrl + `/${conversationId}/version/${versionId}/advancedsettings`)
.pipe(map(settings => {
this.advancedSettingsSubject.next(settings);
return settings;
}));
}

updateSettings(conversationId: number, versionId: number, data: any): Observable<any> {
return this.http.post<any>(this.baseUrl + `/${conversationId}/version/${versionId}/advancedsettings`, data);
}

getVoicesByLanguageCode(appType: string, code: string): Observable<Voice[]> {
return this.http.post<Voice[]>(this.baseUrl + '/voice/available', {applicationType: appType, languageCode: code});
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Get an audio voice sample. `data` contains languageCode, VoiceId and sentence to be read.
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param data any
e2e/ shell/ src/
getVoiceSample(data: any): Observable<string> {
return this.http.post<UrlResponse>(environment.apiUrl + '/sampleaudio', data)
.pipe(map( response => {
return response.url;
}));
}
recordCurrentSettings(): void {
if (!this.hasSettingsUpdate) {
return;
}
this.updateSettings(this.getCurrentConversation().id, this.getLatestVersion().id, this.getSettings()).subscribe();
}

resetCurrentConversationSettings(): Observable<ArrayBuffer> {
const conversationId = this.getCurrentConversation().id;
const versionId = this.getLatestVersion().id;
return this.http.delete<ArrayBuffer>(this.baseUrl + `/${conversationId}/version/${versionId}/advancedsettings`)
.pipe(map(response => {
this.getSettingsFromServer(conversationId, versionId).subscribe();
return response;
}));
}

}
