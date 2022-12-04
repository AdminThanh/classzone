/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query getAssignmentById($id: String!) {\n    getAssignmentById(id: $id) {\n      id\n      startTime\n    }\n  }\n": types.GetAssignmentByIdDocument,
    "\n  mutation createAssignment($createAssignmentInput: CreateAssignmentInput!) {\n    createAssignment(createAssignmentInput: $createAssignmentInput) {\n      id\n      minuteDoing\n      startTime\n    }\n  }\n": types.CreateAssignmentDocument,
    "\n  mutation updateAssignment(\n    $updateAssignmentInput: UpdateAssignmentInput!\n    $id: String!\n  ) {\n    updateAssignment(updateAssignmentInput: $updateAssignmentInput, id: $id) {\n      id\n      startTime\n      score\n      minuteDoing\n    }\n  }\n": types.UpdateAssignmentDocument,
    "\n  query getAttendanceToday($class_id: String!) {\n  getAttendanceToday(class_id: $class_id) {\n    is_present\n    user_id\n    note\n    schedule_id\n  }\n}\n": types.GetAttendanceTodayDocument,
    "\n mutation uppdateAttendances($attendanceClassInput: AttendanceClassInput!, $schedule_id: String!) {\n  updateAttendances(attendanceClassInput: $attendanceClassInput, schedule_id: $schedule_id) \n}\n": types.UppdateAttendancesDocument,
    "\n  mutation Register($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      email\n      token_version\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        firstName\n        lastName\n        phoneNumber\n        address\n        avatar\n        _id\n        role\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query refreshToken {\n    refreshToken {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n        address\n        phoneNumber\n        avatar\n        id\n        role\n      }\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  query getMyClass {\n    getMyClass {\n      id\n      name\n      avatar\n      code\n      from_date\n      end_date\n      scoreFactor\n    }\n  }\n": types.GetMyClassDocument,
    "\n  query getMyClassStudent {\n    getMyClassStudent {\n      id\n      name\n      avatar\n      scoreFactor\n      code\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n": types.GetMyClassStudentDocument,
    "\n  query getClassById($id: String!) {\n    getClassById(id: $id) {\n      name\n      avatar\n      scoreFactor\n      students {\n        id\n        lastName\n        firstName\n        email\n        avatar\n      }\n    }\n  }\n": types.GetClassByIdDocument,
    "\n  query getClassByIdForSchedule($id: String!) {\n    getClassById(id: $id) {\n      id\n      from_date\n      end_date\n    }\n  }\n": types.GetClassByIdForScheduleDocument,
    "\n  mutation createMyClass($createMyClass: CreateMyClassInput!) {\n    createMyClass(createMyClass: $createMyClass) {\n      name\n      avatar\n      code\n      scoreFactor\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateMyClassDocument,
    "\n  mutation updateMyClass(\n    $UpdateMyClassInput: UpdateMyClassInput!\n    $id: String!\n  ) {\n    updateMyClass(updateMyClass: $UpdateMyClassInput, id: $id) {\n      name\n      scoreFactor\n      from_date\n      end_date\n    }\n  }\n": types.UpdateMyClassDocument,
    "\n  mutation assignStudentToClass(\n    $assignStudentToClass: AssignUserToClassInput!\n  ) {\n    assignStudentToClass(assignStudentToClassInput: $assignStudentToClass) {\n      id\n      students {\n        email\n        lastName\n        firstName\n        id\n      }\n    }\n  }\n": types.AssignStudentToClassDocument,
    "\n  mutation deleteMyClass($id: String!) {\n    deleteMyClass(id: $id)\n  }\n": types.DeleteMyClassDocument,
    "\n  query getColumnScoresByClass($id: String!) {\n    getColumnScoresByClass(class_id: $id) {\n      id\n      name\n      note\n      type\n      multiplier\n      scores\n      reference_col\n      examOfClass_id\n    }\n  }\n": types.GetColumnScoresByClassDocument,
    "\n  mutation createColumnScore($inputCreateColumnScore: CreateColumnScoreInput!) {\n    createColumnScore(createAttendanceInput: $inputCreateColumnScore) {\n      name\n      multiplier\n      class_id\n    }\n  }\n": types.CreateColumnScoreDocument,
    "\n  mutation updateColumnScore(\n    $updateColumnScore: UpdateColumnScoreInput!\n    $id: String!\n  ) {\n    updateColumnScore(updateColumnScoreInput: $updateColumnScore, id: $id) {\n      name\n      class_id\n      note\n      type\n      multiplier\n      scores\n      reference_col\n      examOfClass_id\n    }\n  }\n": types.UpdateColumnScoreDocument,
    "\n  mutation deleteColumnScore($id: String!) {\n    deleteColumnScore(deleteColumnScore: $id)\n  }\n": types.DeleteColumnScoreDocument,
    "\n  mutation updateTableScore(\n    $updateTableScore: UpdateTableScoreInput!\n    $class_id: String!\n  ) {\n    updateTableScore(\n      updateTableScoreInput: $updateTableScore\n      class_id: $class_id\n    )\n  }\n": types.UpdateTableScoreDocument,
    "\n  query getAllExam {\n    getAllExam {\n      id\n      name\n      createdAt\n      tags {\n        name\n        color\n      }\n      questions {\n        id\n        question\n        answers\n      }\n    }\n  }\n": types.GetAllExamDocument,
    "\n  query getMyExam {\n    getMyExam {\n      id\n      name\n      tags {\n        name\n        color\n      }\n    }\n  }\n": types.GetMyExamDocument,
    "\n  query getExamById($id: String!) {\n    getExamById(id: $id) {\n      id\n      name\n      createdAt\n      questions {\n        id\n        question\n        answers\n        tags {\n          id\n          name\n          color\n        }\n      }\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n": types.GetExamByIdDocument,
    "\n  query getAllExamClass {\n    getAllExamClass {\n      id\n      minutes\n      dateFrom\n      dateEnd\n      scoreFactor\n      isAllowReview\n    }\n  }\n": types.GetAllExamClassDocument,
    "\n  query getExamClassById($id: String!) {\n    getExamClassById(id: $id) {\n      id\n      dateFrom\n      dateEnd\n      minutes\n      scoreFactor\n      id\n      exam {\n        id\n        name\n        questions {\n          id\n          question\n          answers\n        }\n      }\n    }\n  }\n": types.GetExamClassByIdDocument,
    "\n  mutation createExam($createExamInput: CreateExamInput!) {\n    createExam(createExamInput: $createExamInput) {\n      name\n      id\n      tags {\n        name\n        color\n      }\n      questions {\n        question\n        answers\n      }\n    }\n  }\n": types.CreateExamDocument,
    "\n  mutation updateExam($updateExamInput: UpdateExamInput!, $id: String!) {\n    updateExam(updateExamInput: $updateExamInput, id: $id) {\n      name\n      tags {\n        name\n        color\n        id\n      }\n      questions {\n        id\n        question\n        tags {\n          name\n          color\n          id\n        }\n      }\n    }\n  }\n": types.UpdateExamDocument,
    "\n  mutation deleteExam($id: String!) {\n    deleteExam(id: $id)\n  }\n": types.DeleteExamDocument,
    "\n  mutation createExamClass($createExamClassInput: CreateExamClassInput!) {\n    createExamClass(createExamClassInput: $createExamClassInput) {\n      exam {\n        id\n      }\n      classRoom {\n        id\n      }\n      isAllowReview\n      minutes\n      dateFrom\n      dateEnd\n    }\n  }\n": types.CreateExamClassDocument,
    "\n  mutation createQuestion($createQuestion: CreateQuestionInput!) {\n    createQuestion(createQuestionInput: $createQuestion) {\n      id\n      question\n      answers\n      isMultiple\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n": types.CreateQuestionDocument,
    "\n  query getQuestionById($id: String!) {\n    getQuestionById(id: $id) {\n      question\n      answers\n      isMultiple\n      id\n      correctAnswer {\n        text\n        result\n      }\n    }\n  }\n": types.GetQuestionByIdDocument,
    "\n  query getAllQuestion {\n    getAllQuestion {\n      id\n      question\n      createdAt\n    }\n  }\n": types.GetAllQuestionDocument,
    "\n  query getMyQuestion {\n    getMyQuestion {\n      id\n      question\n      createdAt\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n": types.GetMyQuestionDocument,
    "\n  mutation updateQuestion(\n    $updateQuestionInput: UpdateQuestionInput!\n    $id: String!\n  ) {\n    updateQuestion(updateQuestionInput: $updateQuestionInput, id: $id) {\n      question\n      isMultiple\n      answers\n      correctAnswer {\n        text\n        result\n      }\n    }\n  }\n": types.UpdateQuestionDocument,
    "\n  mutation deleteQuestion($id: String!) {\n    deleteQuestion(id: $id)\n  }\n": types.DeleteQuestionDocument,
    "\n  query getScheduleByClass($id: String!) {\n    getScheduleByClass(id: $id) {\n      id\n      content\n      learn_date\n      is_learn_date\n    }\n  }\n": types.GetScheduleByClassDocument,
    "\n  mutation updateSchedules(\n    $updateSchedulesInput: UpdateSchedulesInput!\n    $class_id: String!\n  ) {\n    updateSchedules(\n      updateSchedulesInput: $updateSchedulesInput\n      class_id: $class_id\n    )\n  }\n": types.UpdateSchedulesDocument,
    "\n  query getScheduleByLearnDate($learn_date: String!, $class_id: String!) {\n    getScheduleByLearnDate(learn_date: $learn_date, class_id: $class_id) {\n      learn_date\n      id\n    }\n  }\n": types.GetScheduleByLearnDateDocument,
    "\n  query getAllUsers {\n    getAllUsers {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query getInfoMe {\n    me {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.GetInfoMeDocument,
    "\n  query getTag {\n    getTag {\n      id\n      _id\n      name\n      color\n    }\n  }\n": types.GetTagDocument,
    "\n  mutation createTag($createTagInput: CreateTagInput!) {\n    createTag(createTagInput: $createTagInput) {\n      name\n      color\n    }\n  }\n": types.CreateTagDocument,
    "\n  mutation deleteTag($id: String!) {\n    deleteTag(deleteMyInput: $id)\n  }\n": types.DeleteTagDocument,
    "\nmutation updateprofile($updateProfileInput: UpdateProfileInput!) {\n    updateProfile(updateProfileInput: $updateProfileInput) {\n      firstName\n      lastName\n      phoneNumber\n      address\n      avatar\n    }\n  }": types.UpdateprofileDocument,
};

export function graphql(source: "\n  query getAssignmentById($id: String!) {\n    getAssignmentById(id: $id) {\n      id\n      startTime\n    }\n  }\n"): (typeof documents)["\n  query getAssignmentById($id: String!) {\n    getAssignmentById(id: $id) {\n      id\n      startTime\n    }\n  }\n"];
export function graphql(source: "\n  mutation createAssignment($createAssignmentInput: CreateAssignmentInput!) {\n    createAssignment(createAssignmentInput: $createAssignmentInput) {\n      id\n      minuteDoing\n      startTime\n    }\n  }\n"): (typeof documents)["\n  mutation createAssignment($createAssignmentInput: CreateAssignmentInput!) {\n    createAssignment(createAssignmentInput: $createAssignmentInput) {\n      id\n      minuteDoing\n      startTime\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateAssignment(\n    $updateAssignmentInput: UpdateAssignmentInput!\n    $id: String!\n  ) {\n    updateAssignment(updateAssignmentInput: $updateAssignmentInput, id: $id) {\n      id\n      startTime\n      score\n      minuteDoing\n    }\n  }\n"): (typeof documents)["\n  mutation updateAssignment(\n    $updateAssignmentInput: UpdateAssignmentInput!\n    $id: String!\n  ) {\n    updateAssignment(updateAssignmentInput: $updateAssignmentInput, id: $id) {\n      id\n      startTime\n      score\n      minuteDoing\n    }\n  }\n"];
export function graphql(source: "\n  query getAttendanceToday($class_id: String!) {\n  getAttendanceToday(class_id: $class_id) {\n    is_present\n    user_id\n    note\n    schedule_id\n  }\n}\n"): (typeof documents)["\n  query getAttendanceToday($class_id: String!) {\n  getAttendanceToday(class_id: $class_id) {\n    is_present\n    user_id\n    note\n    schedule_id\n  }\n}\n"];
export function graphql(source: "\n mutation uppdateAttendances($attendanceClassInput: AttendanceClassInput!, $schedule_id: String!) {\n  updateAttendances(attendanceClassInput: $attendanceClassInput, schedule_id: $schedule_id) \n}\n"): (typeof documents)["\n mutation uppdateAttendances($attendanceClassInput: AttendanceClassInput!, $schedule_id: String!) {\n  updateAttendances(attendanceClassInput: $attendanceClassInput, schedule_id: $schedule_id) \n}\n"];
export function graphql(source: "\n  mutation Register($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      email\n      token_version\n    }\n  }\n"): (typeof documents)["\n  mutation Register($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      email\n      token_version\n    }\n  }\n"];
export function graphql(source: "\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        firstName\n        lastName\n        phoneNumber\n        address\n        avatar\n        _id\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      accessToken\n      refreshToken\n      user {\n        email\n        firstName\n        lastName\n        phoneNumber\n        address\n        avatar\n        _id\n        role\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query refreshToken {\n    refreshToken {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n        address\n        phoneNumber\n        avatar\n        id\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  query refreshToken {\n    refreshToken {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n        address\n        phoneNumber\n        avatar\n        id\n        role\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];
export function graphql(source: "\n  query getMyClass {\n    getMyClass {\n      id\n      name\n      avatar\n      code\n      from_date\n      end_date\n      scoreFactor\n    }\n  }\n"): (typeof documents)["\n  query getMyClass {\n    getMyClass {\n      id\n      name\n      avatar\n      code\n      from_date\n      end_date\n      scoreFactor\n    }\n  }\n"];
export function graphql(source: "\n  query getMyClassStudent {\n    getMyClassStudent {\n      id\n      name\n      avatar\n      scoreFactor\n      code\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMyClassStudent {\n    getMyClassStudent {\n      id\n      name\n      avatar\n      scoreFactor\n      code\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getClassById($id: String!) {\n    getClassById(id: $id) {\n      name\n      avatar\n      scoreFactor\n      students {\n        id\n        lastName\n        firstName\n        email\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query getClassById($id: String!) {\n    getClassById(id: $id) {\n      name\n      avatar\n      scoreFactor\n      students {\n        id\n        lastName\n        firstName\n        email\n        avatar\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getClassByIdForSchedule($id: String!) {\n    getClassById(id: $id) {\n      id\n      from_date\n      end_date\n    }\n  }\n"): (typeof documents)["\n  query getClassByIdForSchedule($id: String!) {\n    getClassById(id: $id) {\n      id\n      from_date\n      end_date\n    }\n  }\n"];
export function graphql(source: "\n  mutation createMyClass($createMyClass: CreateMyClassInput!) {\n    createMyClass(createMyClass: $createMyClass) {\n      name\n      avatar\n      code\n      scoreFactor\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createMyClass($createMyClass: CreateMyClassInput!) {\n    createMyClass(createMyClass: $createMyClass) {\n      name\n      avatar\n      code\n      scoreFactor\n      createdAt\n      updatedAt\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateMyClass(\n    $UpdateMyClassInput: UpdateMyClassInput!\n    $id: String!\n  ) {\n    updateMyClass(updateMyClass: $UpdateMyClassInput, id: $id) {\n      name\n      scoreFactor\n      from_date\n      end_date\n    }\n  }\n"): (typeof documents)["\n  mutation updateMyClass(\n    $UpdateMyClassInput: UpdateMyClassInput!\n    $id: String!\n  ) {\n    updateMyClass(updateMyClass: $UpdateMyClassInput, id: $id) {\n      name\n      scoreFactor\n      from_date\n      end_date\n    }\n  }\n"];
export function graphql(source: "\n  mutation assignStudentToClass(\n    $assignStudentToClass: AssignUserToClassInput!\n  ) {\n    assignStudentToClass(assignStudentToClassInput: $assignStudentToClass) {\n      id\n      students {\n        email\n        lastName\n        firstName\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation assignStudentToClass(\n    $assignStudentToClass: AssignUserToClassInput!\n  ) {\n    assignStudentToClass(assignStudentToClassInput: $assignStudentToClass) {\n      id\n      students {\n        email\n        lastName\n        firstName\n        id\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation deleteMyClass($id: String!) {\n    deleteMyClass(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteMyClass($id: String!) {\n    deleteMyClass(id: $id)\n  }\n"];
export function graphql(source: "\n  query getColumnScoresByClass($id: String!) {\n    getColumnScoresByClass(class_id: $id) {\n      id\n      name\n      note\n      type\n      multiplier\n      scores\n      reference_col\n      examOfClass_id\n    }\n  }\n"): (typeof documents)["\n  query getColumnScoresByClass($id: String!) {\n    getColumnScoresByClass(class_id: $id) {\n      id\n      name\n      note\n      type\n      multiplier\n      scores\n      reference_col\n      examOfClass_id\n    }\n  }\n"];
export function graphql(source: "\n  mutation createColumnScore($inputCreateColumnScore: CreateColumnScoreInput!) {\n    createColumnScore(createAttendanceInput: $inputCreateColumnScore) {\n      name\n      multiplier\n      class_id\n    }\n  }\n"): (typeof documents)["\n  mutation createColumnScore($inputCreateColumnScore: CreateColumnScoreInput!) {\n    createColumnScore(createAttendanceInput: $inputCreateColumnScore) {\n      name\n      multiplier\n      class_id\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateColumnScore(\n    $updateColumnScore: UpdateColumnScoreInput!\n    $id: String!\n  ) {\n    updateColumnScore(updateColumnScoreInput: $updateColumnScore, id: $id) {\n      name\n      class_id\n      note\n      type\n      multiplier\n      scores\n      reference_col\n      examOfClass_id\n    }\n  }\n"): (typeof documents)["\n  mutation updateColumnScore(\n    $updateColumnScore: UpdateColumnScoreInput!\n    $id: String!\n  ) {\n    updateColumnScore(updateColumnScoreInput: $updateColumnScore, id: $id) {\n      name\n      class_id\n      note\n      type\n      multiplier\n      scores\n      reference_col\n      examOfClass_id\n    }\n  }\n"];
export function graphql(source: "\n  mutation deleteColumnScore($id: String!) {\n    deleteColumnScore(deleteColumnScore: $id)\n  }\n"): (typeof documents)["\n  mutation deleteColumnScore($id: String!) {\n    deleteColumnScore(deleteColumnScore: $id)\n  }\n"];
export function graphql(source: "\n  mutation updateTableScore(\n    $updateTableScore: UpdateTableScoreInput!\n    $class_id: String!\n  ) {\n    updateTableScore(\n      updateTableScoreInput: $updateTableScore\n      class_id: $class_id\n    )\n  }\n"): (typeof documents)["\n  mutation updateTableScore(\n    $updateTableScore: UpdateTableScoreInput!\n    $class_id: String!\n  ) {\n    updateTableScore(\n      updateTableScoreInput: $updateTableScore\n      class_id: $class_id\n    )\n  }\n"];
export function graphql(source: "\n  query getAllExam {\n    getAllExam {\n      id\n      name\n      createdAt\n      tags {\n        name\n        color\n      }\n      questions {\n        id\n        question\n        answers\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllExam {\n    getAllExam {\n      id\n      name\n      createdAt\n      tags {\n        name\n        color\n      }\n      questions {\n        id\n        question\n        answers\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getMyExam {\n    getMyExam {\n      id\n      name\n      tags {\n        name\n        color\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMyExam {\n    getMyExam {\n      id\n      name\n      tags {\n        name\n        color\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getExamById($id: String!) {\n    getExamById(id: $id) {\n      id\n      name\n      createdAt\n      questions {\n        id\n        question\n        answers\n        tags {\n          id\n          name\n          color\n        }\n      }\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n"): (typeof documents)["\n  query getExamById($id: String!) {\n    getExamById(id: $id) {\n      id\n      name\n      createdAt\n      questions {\n        id\n        question\n        answers\n        tags {\n          id\n          name\n          color\n        }\n      }\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getAllExamClass {\n    getAllExamClass {\n      id\n      minutes\n      dateFrom\n      dateEnd\n      scoreFactor\n      isAllowReview\n    }\n  }\n"): (typeof documents)["\n  query getAllExamClass {\n    getAllExamClass {\n      id\n      minutes\n      dateFrom\n      dateEnd\n      scoreFactor\n      isAllowReview\n    }\n  }\n"];
export function graphql(source: "\n  query getExamClassById($id: String!) {\n    getExamClassById(id: $id) {\n      id\n      dateFrom\n      dateEnd\n      minutes\n      scoreFactor\n      id\n      exam {\n        id\n        name\n        questions {\n          id\n          question\n          answers\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getExamClassById($id: String!) {\n    getExamClassById(id: $id) {\n      id\n      dateFrom\n      dateEnd\n      minutes\n      scoreFactor\n      id\n      exam {\n        id\n        name\n        questions {\n          id\n          question\n          answers\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation createExam($createExamInput: CreateExamInput!) {\n    createExam(createExamInput: $createExamInput) {\n      name\n      id\n      tags {\n        name\n        color\n      }\n      questions {\n        question\n        answers\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createExam($createExamInput: CreateExamInput!) {\n    createExam(createExamInput: $createExamInput) {\n      name\n      id\n      tags {\n        name\n        color\n      }\n      questions {\n        question\n        answers\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateExam($updateExamInput: UpdateExamInput!, $id: String!) {\n    updateExam(updateExamInput: $updateExamInput, id: $id) {\n      name\n      tags {\n        name\n        color\n        id\n      }\n      questions {\n        id\n        question\n        tags {\n          name\n          color\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateExam($updateExamInput: UpdateExamInput!, $id: String!) {\n    updateExam(updateExamInput: $updateExamInput, id: $id) {\n      name\n      tags {\n        name\n        color\n        id\n      }\n      questions {\n        id\n        question\n        tags {\n          name\n          color\n          id\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation deleteExam($id: String!) {\n    deleteExam(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteExam($id: String!) {\n    deleteExam(id: $id)\n  }\n"];
export function graphql(source: "\n  mutation createExamClass($createExamClassInput: CreateExamClassInput!) {\n    createExamClass(createExamClassInput: $createExamClassInput) {\n      exam {\n        id\n      }\n      classRoom {\n        id\n      }\n      isAllowReview\n      minutes\n      dateFrom\n      dateEnd\n    }\n  }\n"): (typeof documents)["\n  mutation createExamClass($createExamClassInput: CreateExamClassInput!) {\n    createExamClass(createExamClassInput: $createExamClassInput) {\n      exam {\n        id\n      }\n      classRoom {\n        id\n      }\n      isAllowReview\n      minutes\n      dateFrom\n      dateEnd\n    }\n  }\n"];
export function graphql(source: "\n  mutation createQuestion($createQuestion: CreateQuestionInput!) {\n    createQuestion(createQuestionInput: $createQuestion) {\n      id\n      question\n      answers\n      isMultiple\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createQuestion($createQuestion: CreateQuestionInput!) {\n    createQuestion(createQuestionInput: $createQuestion) {\n      id\n      question\n      answers\n      isMultiple\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getQuestionById($id: String!) {\n    getQuestionById(id: $id) {\n      question\n      answers\n      isMultiple\n      id\n      correctAnswer {\n        text\n        result\n      }\n    }\n  }\n"): (typeof documents)["\n  query getQuestionById($id: String!) {\n    getQuestionById(id: $id) {\n      question\n      answers\n      isMultiple\n      id\n      correctAnswer {\n        text\n        result\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getAllQuestion {\n    getAllQuestion {\n      id\n      question\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getAllQuestion {\n    getAllQuestion {\n      id\n      question\n      createdAt\n    }\n  }\n"];
export function graphql(source: "\n  query getMyQuestion {\n    getMyQuestion {\n      id\n      question\n      createdAt\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMyQuestion {\n    getMyQuestion {\n      id\n      question\n      createdAt\n      tags {\n        id\n        name\n        color\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateQuestion(\n    $updateQuestionInput: UpdateQuestionInput!\n    $id: String!\n  ) {\n    updateQuestion(updateQuestionInput: $updateQuestionInput, id: $id) {\n      question\n      isMultiple\n      answers\n      correctAnswer {\n        text\n        result\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateQuestion(\n    $updateQuestionInput: UpdateQuestionInput!\n    $id: String!\n  ) {\n    updateQuestion(updateQuestionInput: $updateQuestionInput, id: $id) {\n      question\n      isMultiple\n      answers\n      correctAnswer {\n        text\n        result\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation deleteQuestion($id: String!) {\n    deleteQuestion(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteQuestion($id: String!) {\n    deleteQuestion(id: $id)\n  }\n"];
export function graphql(source: "\n  query getScheduleByClass($id: String!) {\n    getScheduleByClass(id: $id) {\n      id\n      content\n      learn_date\n      is_learn_date\n    }\n  }\n"): (typeof documents)["\n  query getScheduleByClass($id: String!) {\n    getScheduleByClass(id: $id) {\n      id\n      content\n      learn_date\n      is_learn_date\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateSchedules(\n    $updateSchedulesInput: UpdateSchedulesInput!\n    $class_id: String!\n  ) {\n    updateSchedules(\n      updateSchedulesInput: $updateSchedulesInput\n      class_id: $class_id\n    )\n  }\n"): (typeof documents)["\n  mutation updateSchedules(\n    $updateSchedulesInput: UpdateSchedulesInput!\n    $class_id: String!\n  ) {\n    updateSchedules(\n      updateSchedulesInput: $updateSchedulesInput\n      class_id: $class_id\n    )\n  }\n"];
export function graphql(source: "\n  query getScheduleByLearnDate($learn_date: String!, $class_id: String!) {\n    getScheduleByLearnDate(learn_date: $learn_date, class_id: $class_id) {\n      learn_date\n      id\n    }\n  }\n"): (typeof documents)["\n  query getScheduleByLearnDate($learn_date: String!, $class_id: String!) {\n    getScheduleByLearnDate(learn_date: $learn_date, class_id: $class_id) {\n      learn_date\n      id\n    }\n  }\n"];
export function graphql(source: "\n  query getAllUsers {\n    getAllUsers {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query getAllUsers {\n    getAllUsers {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
export function graphql(source: "\n  query getInfoMe {\n    me {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query getInfoMe {\n    me {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
export function graphql(source: "\n  query getTag {\n    getTag {\n      id\n      _id\n      name\n      color\n    }\n  }\n"): (typeof documents)["\n  query getTag {\n    getTag {\n      id\n      _id\n      name\n      color\n    }\n  }\n"];
export function graphql(source: "\n  mutation createTag($createTagInput: CreateTagInput!) {\n    createTag(createTagInput: $createTagInput) {\n      name\n      color\n    }\n  }\n"): (typeof documents)["\n  mutation createTag($createTagInput: CreateTagInput!) {\n    createTag(createTagInput: $createTagInput) {\n      name\n      color\n    }\n  }\n"];
export function graphql(source: "\n  mutation deleteTag($id: String!) {\n    deleteTag(deleteMyInput: $id)\n  }\n"): (typeof documents)["\n  mutation deleteTag($id: String!) {\n    deleteTag(deleteMyInput: $id)\n  }\n"];
export function graphql(source: "\nmutation updateprofile($updateProfileInput: UpdateProfileInput!) {\n    updateProfile(updateProfileInput: $updateProfileInput) {\n      firstName\n      lastName\n      phoneNumber\n      address\n      avatar\n    }\n  }"): (typeof documents)["\nmutation updateprofile($updateProfileInput: UpdateProfileInput!) {\n    updateProfile(updateProfileInput: $updateProfileInput) {\n      firstName\n      lastName\n      phoneNumber\n      address\n      avatar\n    }\n  }"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;